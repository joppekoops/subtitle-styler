import React, { FC } from 'react'
import { TimelineAction } from '@xzdarcy/react-timeline-editor'

import './TimelineVideoClip.scss'

export interface TimelineVideoClipProps {
    action: TimelineAction
    className?: string
}

export const TimelineVideoClip: FC<TimelineVideoClipProps> = ({
    action,
    className = '',
}) => (
    <div className={`timeline-video-clip ${className}`}>
        <div className={`timeline-video-clip__id`}>
            {action.id}
        </div>
    </div>
)