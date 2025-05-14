import React, { FC, ReactElement } from 'react'
import { TimelineAction } from '@xzdarcy/react-timeline-editor'

import './TimelineCaptionClip.scss'

export interface TimelineCaptionClipProps {
    action: TimelineAction
    className?: string
}

export const TimelineCaptionClip: FC<TimelineCaptionClipProps> = ({
    action,
    className = '',
}): ReactElement => (
    <div className={`timeline-caption-clip ${action.selected ? 'timeline-caption-clip--selected' : ''} ${className}`}>
        <div className="timeline-caption-clip__id">
            {action.id}
        </div>
    </div>
)