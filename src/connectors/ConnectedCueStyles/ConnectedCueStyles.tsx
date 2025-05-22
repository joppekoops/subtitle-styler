import { FC } from 'react'

import { CueStyles } from '@app-compositions'
import { updateCue, useTypedDispatch, useTypedSelector } from '@app-redux'

export const ConnectedCueStyles: FC = () => {
    const { cues, selectedCueIndex } = useTypedSelector((state) => state.cueSlice)
    const { presets } = useTypedSelector((state) => state.styleSlice)

    const dispatch = useTypedDispatch()

    const handleUpdateCue = (cueIndex: number, updates: Partial<VTTCue>): void => {
        dispatch(updateCue({ cueIndex, updates }))
    }

    return (
        <CueStyles
            cue={cues[selectedCueIndex !== undefined ? selectedCueIndex : -1]}
            cueIndex={selectedCueIndex}
            presets={presets}
            onCueChange={handleUpdateCue}
        />
    )
}