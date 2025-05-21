import { TimelineAction, TimelineRow } from '@xzdarcy/react-timeline-editor'
import React, { FC } from 'react'

import {
    setActiveCueIndex,
    setSelectedCueIndex,
    setTimeSetter,
    updateCue,
    useTypedDispatch,
    useTypedSelector,
} from '@app-redux'
import { Timeline } from '@app-compositions'

export const ConnectedTimeline: FC = () => {
    const dispatch = useTypedDispatch()
    const { cues, selectedCueIndex } = useTypedSelector((state) => state.cueSlice)
    const { currentTime, videoMetadata, isPlaying } = useTypedSelector((state) => state.videoSlice)

    const videoLength = videoMetadata?.track?.find(track => track['@type'] === 'Video')?.Duration || 120

    const handleCueClick = (event: any, params: {
        action: TimelineAction,
        row: TimelineRow,
        time: number
    }): void => {
        if (params.action.effectId !== 'caption') {
            return
        }

        const cueIndex = params.row.actions.indexOf(params.action)

        dispatch(setSelectedCueIndex(cueIndex))
        dispatch(setActiveCueIndex(cueIndex))
    }

    const handleTimeChange = (time: number): boolean => {
        dispatch(setTimeSetter(time))
        return true
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

        const cueIndex = params.row.actions.indexOf(params.action)

        dispatch(updateCue({
            cueIndex: cueIndex,
            updates: {
                startTime: params.start,
                endTime: params.end,
            },
        }))

        return true
    }

    return (
        <Timeline
            cues={cues}
            selectedCueIndex={selectedCueIndex}
            videoLength={videoLength}
            currentTime={currentTime}
            isPlaying={isPlaying}
            onCueClick={handleCueClick}
            onCueMove={handleCueMove}
            onSetCurrentTime={handleTimeChange}
        />
    )
}
