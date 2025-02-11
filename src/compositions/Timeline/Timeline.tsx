import { FC, ReactElement } from 'react'

import './Timeline.scss'

export interface TimelineProps {
    cues: VTTCue[]
    activeCueIndex?: number
    onCueClick: (index: number) => void
    className?: string
}

export const Timeline: FC<TimelineProps> = ({
    cues,
    activeCueIndex,
    onCueClick,
    className = '',
}): ReactElement => (
    <div className={`timeline ${className}`}>
        <ul className="timeline__list">
            {cues.map((cue, index) => (
                <li key={index}
                    className={`timeline__list-item ${activeCueIndex === index ? 'timeline__list-item--active' : ''}`}
                >
                    <button onClick={() => onCueClick(index)} className="timeline__cue-button">
                        <span className="timeline__cue-start">{cue.startTime}</span>
                        <span className="timeline__cue-end">{cue.endTime}</span>
                        <span className="timeline__cue-text">{cue.text}</span>
                    </button>
                </li>
            ))}
        </ul>
    </div>
)
