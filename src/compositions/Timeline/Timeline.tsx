import React, { FC, ReactElement, useEffect, useRef, useState } from 'react'
import {
    Timeline as ReactTimeline,
    TimelineAction,
    TimelineEffect,
    TimelineRow,
    TimelineState,
} from '@xzdarcy/react-timeline-editor'

import { TimelineCaptionClip, TimelineVideoClip, TimelineControls } from '@app-components'

import './Timeline.scss'

export interface TimelineProps {
    cues: VTTCue[]
    activeCueIndex?: number
    videoLength: number
    currentTime: number
    isPlaying: boolean
    onCueClick: (event: any, params: { action: TimelineAction, row: TimelineRow, time: number }) => void
    onCueMove: (params: { action: TimelineAction, row: TimelineRow, start: number, end: number }) => boolean
    onSetCurrentTime: (time: number) => boolean
    className?: string
}

export const Timeline: FC<TimelineProps> = ({
    cues,
    activeCueIndex,
    videoLength,
    currentTime,
    isPlaying,
    onCueClick,
    onCueMove,
    onSetCurrentTime,
    className = '',
}): ReactElement => {
    const [scale, setScale] = useState(5)
    const [scaleWidth, setScaleWidth] = useState(50)
    const [timelineData, setTimelineData] = useState<TimelineRow[]>([])

    const timelineState = useRef<TimelineState>(null)

    const minScaleWidth = 50

    const timelineEffects: Record<string, TimelineEffect> = {
        caption: {
            id: 'caption',
        },
        video: {
            id: 'video',
        },
    }

    const increaseZoom = () => {
        if (scale > 2) {
            setScale(scale / 2)
        } else {
            setScaleWidth(scaleWidth * 2)
        }
    }

    const decreaseZoom = () => {
        if (
            timelineState.current
            && videoLength * (scaleWidth / Math.floor(scale)) < timelineState.current.target.clientWidth
        ) {
            return
        }

        if (scaleWidth > minScaleWidth) {
            setScaleWidth(scaleWidth / 2)
        } else {
            setScale(scale * 2)
        }
    }

    const scrollToTime = (
        timelineState: TimelineState,
        time: number,
        position: number,
        scale: number,
        scaleWidth: number,
        maxScrollTime: number = Infinity,
    ): void => {
        const timelineWidth = timelineState.target.clientWidth
        const rightScrollMargin = 50
        const maxScroll = maxScrollTime * (scaleWidth / Math.floor(scale)) - timelineWidth + rightScrollMargin
        const left = Math.min(time * (scaleWidth / Math.floor(scale)) - (timelineWidth * position), maxScroll)
        timelineState.setScrollLeft(left)
    }

    useEffect(() => {
        if (! timelineState.current) {
            return
        }

        // Auto scroll while playing
        timelineState.current.listener.on('setTimeByTick', ({ time }) => {
            if (timelineState.current) {
                timelineState.current.setTime(time) // Necessary for smooth scroll

                scrollToTime(timelineState.current, time, 0.8, scale, scaleWidth, videoLength)
            }
        })

        // Scroll to current time while zooming
        scrollToTime(timelineState.current, timelineState.current.getTime(), 0.5, scale, scaleWidth)

        return () => {
            if (! timelineState.current) {
                return
            }

            timelineState.current.listener.offAll()
        }
    }, [scale, scaleWidth])

    // Sync current time with video
    useEffect(() => {
        if (! timelineState.current) {
            return
        }

        timelineState.current.setTime(currentTime)
    }, [currentTime, timelineState.current])

    // Sync play state with video
    useEffect(() => {
        if (! timelineState.current) {
            return
        }

        if (isPlaying && ! timelineState.current.isPlaying) {
            timelineState.current.play({ autoEnd: true })
        } else if (! isPlaying && timelineState.current.isPlaying) {
            timelineState.current.pause()
        }
    }, [isPlaying, timelineState.current])

    useEffect(() => {
        setTimelineData(() => [
            {
                id: 'cues',
                actions: cues.map((cue, index) => ({
                    id: cue.id,
                    start: cue.startTime,
                    end: cue.endTime,
                    effectId: 'caption',
                    selected: activeCueIndex === index,
                })),
            },
            {
                id: 'video',
                actions: [
                    {
                        id: 'video',
                        start: 0,
                        end: videoLength,
                        effectId: 'video',
                        movable: false,
                        flexible: false,
                    },
                ],
                rowHeight: 80,
            },
        ])
    }, [cues, activeCueIndex])

    return (
        <div className={`timeline ${className}`}>
            <TimelineControls onZoomIn={increaseZoom} onZoomOut={decreaseZoom} />

            <ReactTimeline
                ref={timelineState}
                editorData={timelineData}
                effects={timelineEffects}
                rowHeight={50}
                autoScroll={true}
                dragLine={true}
                scale={Math.floor(scale)}
                scaleWidth={scaleWidth}
                getActionRender={
                    (action) => action.effectId === 'caption'
                        ? <TimelineCaptionClip action={action} />
                        : <TimelineVideoClip action={action} />
                }
                onClickTimeArea={onSetCurrentTime}
                onCursorDrag={onSetCurrentTime}
                onActionMoving={onCueMove}
                onActionResizing={onCueMove}
                onClickAction={onCueClick}
                onChange={setTimelineData}
                style={{
                    width: 'unset',
                    height: '100%',
                }}
            />
        </div>
    )
}
