import { FC } from 'react'

import { VideoPlayer } from '@app-compositions'
import {
    setActiveCueIndex,
    setCues,
    setCurrentTime,
    useTypedDispatch,
    useTypedSelector,
} from '@app-redux'

export const ConnectedVideoPlayer: FC = () => {
    const dispatch = useTypedDispatch()
    const { videoFile, subtitleFile, currentTime } = useTypedSelector((state) => state.videoSlice)
    const { activeCueIndex } = useTypedSelector((state) => state.cueSlice)

    const handleCuesLoaded = (cues: VTTCue[]) => {
        dispatch(setCues(cues))
    }

    const handleActiveCuesChanged = (_activeCues: VTTCue[], index: number) => {
        if (index >= 0) {
            dispatch(setActiveCueIndex(index))
        }
    }

    const handleTimeChange = (time: number) => {
        dispatch(setCurrentTime(time))
    }

    return (
        <>
            {(videoFile && subtitleFile) && (
                <VideoPlayer
                    src={videoFile}
                    subtitleSrc={subtitleFile}
                    showSubtitlesByDefault
                    activeCueIndex={activeCueIndex}
                    currentTime={currentTime}
                    onCuesLoaded={handleCuesLoaded}
                    onActiveCuesChanged={handleActiveCuesChanged}
                    onTimeChanged={handleTimeChange}
                />
            )}
        </>
    )
}
