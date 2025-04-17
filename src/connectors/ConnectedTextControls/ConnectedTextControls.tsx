import { FC } from 'react'

import { setActiveCueIndex, updateCue, useTypedDispatch, useTypedSelector } from '@app-redux'
import { TextControls } from '@app-compositions'

export const ConnectedTextControls: FC = () => {
    const { cues, activeCueIndex } = useTypedSelector((state) => state.cueSlice)
    const { videoMetadata } = useTypedSelector((state) => state.videoSlice)

    const dispatch = useTypedDispatch()

    const framerate = videoMetadata?.track.find(track => track['@type'] === 'Video')?.FrameRate || 30

    const handleSetActiveCueIndex = (index: number): void => {
        dispatch(setActiveCueIndex(index))
    }

    const handleUpdateCue = (cueIndex: number, updates: Partial<VTTCue>): void => {
        dispatch(updateCue({ cueIndex, updates }))
    }

    return (
        <TextControls
            cues={cues}
            framerate={framerate}
            activeCueIndex={activeCueIndex}
            onUpdateCue={(cueIndex, updates) => handleUpdateCue(cueIndex, updates)}
            onSetActiveCueIndex={handleSetActiveCueIndex}
        />
    )
}
