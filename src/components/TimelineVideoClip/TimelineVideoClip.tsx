import { TimelineAction } from '@xzdarcy/react-timeline-editor'
import React, { FC, ReactElement } from 'react'

import './TimelineVideoClip.scss'

export interface TimelineVideoClipProps {
    action: TimelineAction
    className?: string
}

export const TimelineVideoClip: FC<TimelineVideoClipProps> = ({
    action,
    className = '',
}): ReactElement => (
    <div className={`timeline-video-clip ${className}`}>
        <div className="timeline-video-clip__id">
            {action.id}
        </div>
    </div>
)