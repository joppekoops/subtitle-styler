import { FC } from 'react'

import { VideoPlayer } from '@app-compositions'
import {
    setActiveCueIndex,
    setCues,
    setCurrentTime,
    setPlayState,
    useTypedDispatch,
    useTypedSelector,
} from '@app-redux'

export const ConnectedVideoPlayer: FC = () => {
    const dispatch = useTypedDispatch()
    const { videoFile, subtitleFile, timeSetter } = useTypedSelector((state) => state.videoSlice)
    const { activeCueIndex } = useTypedSelector((state) => state.cueSlice)

    const handleCuesLoaded = (cues: VTTCue[]) => {
        dispatch(setCues(cues))
    }

    const handleActiveCuesChanged = (_activeCues: VTTCue[], index: number) => {
        dispatch(setActiveCueIndex(index >= 0 ? index : undefined))
    }

    const handleTimeChange = (time: number) => {
        dispatch(setCurrentTime(time))
    }

    const handleIsPlayingChange = (isPlaying: boolean) => {
        dispatch(setPlayState(isPlaying))
    }

    return (
        <>
            {(videoFile && subtitleFile) && (
                <VideoPlayer
                    src={videoFile}
                    subtitleSrc={subtitleFile}
                    showSubtitlesByDefault
                    activeCueIndex={activeCueIndex}
                    currentTime={timeSetter}
                    onCuesLoaded={handleCuesLoaded}
                    onActiveCuesChanged={handleActiveCuesChanged}
                    onTimeChanged={handleTimeChange}
                    onIsPlayingChange={handleIsPlayingChange}
                />
            )}
        </>
    )
}
