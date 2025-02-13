import { CSSProperties, FC, ReactElement } from 'react'

import './Timeline.scss'

export interface TimelineProps {
    cues: VTTCue[]
    activeCueIndex?: number
    onCueClick: (index: number) => void
    currentTime: number
    className?: string
}

export const Timeline: FC<TimelineProps> = ({
    cues,
    activeCueIndex,
    onCueClick,
    currentTime,
    className = '',
}): ReactElement => (
    <div
        className={`timeline ${className}`}
        style={{ '--current-time': currentTime } as CSSProperties}
    >

        <div className="timeline__timings"></div>

        <ul className="timeline__cue-list">
            {cues.map((cue, index) => (
                <li key={index}
                    className={`timeline__cue-item ${activeCueIndex === index ? 'timeline__cue-item--active' : ''}`}
                    style={{ '--start-time': cue.startTime, '--end-time': cue.endTime } as CSSProperties}
                >
                    <button onClick={() => onCueClick(index)} className="timeline__cue-button">
                        <span className="timeline__cue-id">{cue.id}</span>
                    </button>
                </li>
            ))}
        </ul>

        <div className="timeline__playhead"></div>
    </div>
)
