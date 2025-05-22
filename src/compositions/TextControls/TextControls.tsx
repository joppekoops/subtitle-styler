import { ChangeEvent, FC, ReactElement, useCallback, useEffect, useState } from 'react'

import { clearInvalid, numberToTimecode, scrollIntoViewIfNeeded, setInvalid, timecodeToNumber } from '@app-helpers'
import { CueWithTimecode } from '@app-entities'
import { AccessibilityWarningCard } from '@app-components'
import {
    checkCueLength,
    checkLineLength,
    checkMaxCharsPerSecond,
    checkMaxLines,
    checkMinFramesBetween,
} from '@app-a11y'

import './TextControls.scss'

export interface TextControlsProps {
    cues: VTTCue[]
    framerate: number
    activeCueIndex?: number
    selectedCueIndex?: number
    onUpdateCue: (cueIndex: number, updates: Partial<VTTCue>) => void
    onSelectCue: (index: number) => void
    className?: string
}

export const TextControls: FC<TextControlsProps> = ({
    cues,
    framerate,
    activeCueIndex,
    selectedCueIndex,
    onUpdateCue,
    onSelectCue,
    className = '',
}): ReactElement => {
    const [cuesWithTimecode, setCuesWithTimecode] = useState<CueWithTimecode[]>([])

    const selectedCueItem = useCallback((item: HTMLLIElement) => {
        if (! item) {
            return
        }

        scrollIntoViewIfNeeded(item)
    }, [selectedCueIndex])

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
            onSelectCue(index)
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
                            <li
                                key={index}
                                className="text-controls__cue-item"
                                ref={selectedCueIndex === index ? selectedCueItem : undefined}
                            >
                                <AccessibilityWarningCard
                                    warnings={[
                                        checkLineLength(cue.cue.text),
                                        checkMaxLines(cue.cue.text),
                                        checkMaxCharsPerSecond(cue.cue.text, cue.cue.startTime, cue.cue.endTime),
                                        checkCueLength(cue.cue.startTime, cue.cue.endTime),
                                        cuesWithTimecode[index + 1] ? checkMinFramesBetween(cue.cue.endTime, cuesWithTimecode[index + 1].cue.startTime, framerate) : null,
                                    ].filter(res => !! res)}
                                    className="text-controls__warning"
                                />
                                <button
                                    className={`text-controls__cue ${selectedCueIndex === index ? 'text-controls__cue--selected' : ''} ${activeCueIndex === index ? 'text-controls__cue--active' : ''}`}

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