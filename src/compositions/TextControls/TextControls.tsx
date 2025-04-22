import { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react'

import { clearInvalid, numberToTimecode, setInvalid, timecodeToNumber } from '@app-helpers'
import { CueWithTimecode } from '@app-entities'

import './TextControls.scss'

export interface TextControlsProps {
    cues: VTTCue[]
    framerate: number
    activeCueIndex: number | undefined
    onUpdateCue: (cueIndex: number, updates: Partial<VTTCue>) => void
    onSetActiveCueIndex: (index: number) => void
    className?: string
}

export const TextControls: FC<TextControlsProps> = ({
    cues,
    framerate,
    activeCueIndex,
    onUpdateCue,
    onSetActiveCueIndex,
    className = '',
}): ReactElement => {
    const [cuesWithTimecode, setCuesWithTimecode] = useState<CueWithTimecode[]>([])

    const handleCueTimeBlur = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        try {
            const startTime = timecodeToNumber(cuesWithTimecode[index].startTimecode, framerate)
            const endTime = timecodeToNumber(cuesWithTimecode[index].endTimecode, framerate)

            if (startTime > endTime) {
                throw new RangeError('Start time cannot be greater than end time')
            }

            onUpdateCue(index, { startTime, endTime })

            clearInvalid(event.target)
        } catch (error) {
            if (error instanceof RangeError) {
                setInvalid(event.target, 'Start time cannot be greater than end time')
            } else {
                setInvalid(event.target, 'Invalid timecode')
            }
        }
    }

    const handleCueTimeChange = (event: ChangeEvent<HTMLInputElement>, index: number, type: 'startTimecode' | 'endTimecode') => {
        setCuesWithTimecode(cuesWithTimecode.map((cue, i) => i === index ? {
            ...cue,
            [type]: event.target.value,
        } : cue))
        clearInvalid(event.target)
    }

    const handleCueTextChange = (event: ChangeEvent<HTMLTextAreaElement>, index: number) => {
        onUpdateCue(index, { text: event.target.value })
    }

    const handleCueIdChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        onUpdateCue(index, { id: event.target.value })
    }

    const handleCueClick = (index: number) => {
        if (index !== -1) {
            onSetActiveCueIndex(index)
        }
    }

    useEffect(() => {
        setCuesWithTimecode(cues.map(cue => ({
            cue,
            startTimecode: numberToTimecode(cue.startTime, framerate),
            endTimecode: numberToTimecode(cue.endTime, framerate),
        })))
    }, [cues])

    return (
        <section className={`text-controls ${className}`}>
            {cuesWithTimecode.length
                ?
                <ul className="text-controls__cue-list">
                    {
                        cuesWithTimecode.map((cue, index) => (
                            <li key={index} className="text-controls__cue-item">
                                <button
                                    className={`text-controls__cue ${activeCueIndex === index ? 'text-controls__cue--active' : ''}`}

                                    // Only make the currently edited cue selectable while it has an error
                                    onFocusCapture={() => handleCueClick(index)}
                                >
                                    <input
                                        className="text-controls__input"
                                        type="text"
                                        value={cue.cue.id}
                                        onChange={(event) => handleCueIdChange(event, index)}
                                    />
                                    <input
                                        className="text-controls__input"
                                        type="text"
                                        value={cue.startTimecode}
                                        onChange={(event) => handleCueTimeChange(event, index, 'startTimecode')}
                                        onBlur={(event) => handleCueTimeBlur(event, index)}
                                    />
                                    <input
                                        className="text-controls__input"
                                        type="text"
                                        value={cue.endTimecode}
                                        onChange={(event) => handleCueTimeChange(event, index, 'endTimecode')}
                                        onBlur={(event) => handleCueTimeBlur(event, index)}
                                    />
                                    <textarea
                                        className="text-controls__textarea"
                                        value={cue.cue.text}
                                        onChange={(event) => handleCueTextChange(event, index)}
                                    />
                                </button>
                            </li>
                        ))
                    }
                </ul>
                : <div className="text-controls__empty">
                    <p>No cues available</p>
                </div>
            }
        </section>
    )
}