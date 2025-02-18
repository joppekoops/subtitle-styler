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
    const { videoFile, subtitleFile } = useTypedSelector((state) => state.videoSlice)
    const { cues, activeCueIndex } = useTypedSelector((state) => state.cueSlice)

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

    //const handleButtonClick = () => {
    //    dispatch(setVideoFile('/res/test2.mp4'))
    //}
    // {/*<button onClick={handleButtonClick}>Switch video file</button>*/}

    // TODO: If videoFile and/or subtitleFile is null, show file browse dialog

    return (
        <>
            {(videoFile && subtitleFile) && (
                <VideoPlayer
                    src={videoFile}
                    subtitleSrc={subtitleFile}
                    showSubtitlesByDefault
                    activeCueIndex={activeCueIndex}
                    onCuesLoaded={handleCuesLoaded}
                    onActiveCuesChanged={handleActiveCuesChanged}
                    onTimeChanged={handleTimeChange}
                />
            )}
        </>
    )
}
