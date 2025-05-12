import React, { CSSProperties, FC, ReactElement, useEffect, useRef } from 'react'
import {
    Timeline as ReactTimeline,
    TimelineAction,
    TimelineEffect,
    TimelineRow,
    TimelineState,
} from '@xzdarcy/react-timeline-editor'

import { TimelineCaptionClip, TimelineVideoClip } from '@app-components'

import './Timeline.scss'

export interface TimelineProps {
    cues: VTTCue[]
    activeCueIndex?: number
    videoLength: number
    currentTime: number
    onCueClick: (event: any, params: {
        action: TimelineAction,
        row: TimelineRow,
        time: number
    }) => void
    onCueMove: (params: { action: TimelineAction, row: TimelineRow, start: number, end: number }) => boolean
    onSetCurrentTime: (time: number) => void
    className?: string
}

export const Timeline: FC<TimelineProps> = ({
    cues,
    activeCueIndex,
    videoLength,
    currentTime,
    onCueClick,
    onCueMove,
    onSetCurrentTime,
    className = '',
}): ReactElement => {

    const timeline = useRef<TimelineState>(null)

    const cueActions: TimelineAction[] = cues.map((cue, index) => ({
        id: index.toString(),
        start: cue.startTime,
        end: cue.endTime,
        effectId: 'caption',
        selected: activeCueIndex === index,
    }))

    const timelineData: TimelineRow[] = [
        {
            id: 'cues',
            actions: cueActions,
        },
        {
            id: 'video',
            actions: [
                {
                    id: 'videoAction',
                    start: 0,
                    end: videoLength,
                    effectId: 'video',
                    movable: false,
                    flexible: false,
                },
            ],
            rowHeight: 80,
        },
    ]

    const timelineEffects: Record<string, TimelineEffect> = {
        caption: {
            id: 'caption',
            name: 'caption',
        },
        video: {
            id: 'video',
            name: 'video',
        },
    }

    useEffect(() => {
        if (! timeline.current) {
            return
        }

        timeline.current.setTime(currentTime)
    }, [currentTime, timeline])

    return (
        <div
            className={`timeline ${className}`}
            style={{ '--current-time': currentTime } as CSSProperties}
        >

            <ReactTimeline
                ref={timeline}
                editorData={timelineData}
                effects={timelineEffects}
                rowHeight={50}
                scale={5}
                scaleWidth={50}
                getActionRender={
                    (action) => action.effectId === 'caption'
                        ? <TimelineCaptionClip action={action} />
                        : <TimelineVideoClip action={action} />
                }
                onClickTimeArea={(time => {
                    onSetCurrentTime(time)
                    return true
                })}
                onCursorDrag={onSetCurrentTime}
                onActionMoving={onCueMove}
                onActionResizing={onCueMove}
                onClickAction={onCueClick}
                onChange={() => {
                }}
                style={{
                    width: 'unset',
                    height: '100%',
                }}
            />

        </div>
    )
}
