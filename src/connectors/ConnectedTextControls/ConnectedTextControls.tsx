import { FC } from 'react'

import { setActiveCueIndex, setSelectedCueIndex, updateCue, useTypedDispatch, useTypedSelector } from '@app-redux'
import { TextControls } from '@app-compositions'

export const ConnectedTextControls: FC = () => {
    const { cues, activeCueIndex, selectedCueIndex } = useTypedSelector((state) => state.cueSlice)
    const { videoMetadata } = useTypedSelector((state) => state.videoSlice)

    const dispatch = useTypedDispatch()

    const framerate = videoMetadata?.track.find(track => track['@type'] === 'Video')?.FrameRate || 30

    const handleSelectCue = (index: number): void => {
        dispatch(setSelectedCueIndex(index))
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
            selectedCueIndex={selectedCueIndex}
            onUpdateCue={(cueIndex, updates) => handleUpdateCue(cueIndex, updates)}
            onSelectCue={handleSelectCue}
        />
    )
}
