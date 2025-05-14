import React, { FC, ReactElement } from 'react'

import { Icon } from '@app-components'

import './TimelineControls.scss'

export interface TimelineControlsProps {
    onZoomIn: () => void
    onZoomOut: () => void
    className?: string
}

export const TimelineControls: FC<TimelineControlsProps> = ({
    onZoomIn,
    onZoomOut,
    className = '',
}): ReactElement => (
    <div className={`timeline-controls ${className}`}>
        <button onClick={onZoomIn} className="timeline-controls__button button button--icon">
            <Icon name="add" />
        </button>
        <button onClick={onZoomOut} className="timeline-controls__button button button--icon">
            <Icon name="subtract" />
        </button>
    </div>
)