import { TimelineAction, TimelineRow } from '@xzdarcy/react-timeline-editor'
import React, { FC } from 'react'

import { setActiveCueIndex, setCurrentTime, updateCue, useTypedDispatch, useTypedSelector } from '@app-redux'
import { Timeline } from '@app-compositions'

export const ConnectedTimeline: FC = () => {
    const dispatch = useTypedDispatch()
    const { cues, activeCueIndex } = useTypedSelector((state) => state.cueSlice)
    const { currentTime, videoMetadata } = useTypedSelector((state) => state.videoSlice)

    const videoLength = videoMetadata?.track.find(track => track['@type'] === 'Video')?.Duration || 120

    const handleCueClick = (event: any, params: {
        action: TimelineAction,
        row: TimelineRow,
        time: number
    }): void => {
        if (params.action.effectId !== 'caption') {
            return
        }

        dispatch(setActiveCueIndex(params.action.id))
    }

    const handleTimeChange = (time: number): void => {
        dispatch(setCurrentTime(time))
    }

    const handleCueMove = (params: {
        action: TimelineAction,
        row: TimelineRow,
        start: number,
        end: number
    }): boolean => {
        if (params.action.effectId !== 'caption') {
            return false
        }

        dispatch(updateCue({
            cueIndex: params.action.id, updates: {
                startTime: params.start,
                endTime: params.end,
            },
        }))

        return true
    }

    return (
        <Timeline
            cues={cues}
            activeCueIndex={activeCueIndex}
            videoLength={videoLength}
            currentTime={currentTime}
            onCueClick={handleCueClick}
            onCueMove={handleCueMove}
            onSetCurrentTime={handleTimeChange}
        />
    )
}
