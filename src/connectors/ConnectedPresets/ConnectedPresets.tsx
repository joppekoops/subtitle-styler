import { FC } from 'react'

import { Presets } from '@app-compositions'
import {
    addPreset,
    removePreset,
    renamePreset,
    selectPreset,
    updatePreset,
    useTypedDispatch,
    useTypedSelector,
} from '@app-redux'
import { Preset } from '@app-entities'

export const ConnectedPresets: FC = () => {
    const { presets, selectedPreset } = useTypedSelector((state) => state.styleSlice)

    const dispatch = useTypedDispatch()

    return (
        <Presets
            presets={presets}
            selectedPreset={selectedPreset}
            onAddPreset={(name: string) => dispatch(addPreset(name))}
            onRemovePreset={(index: number) => dispatch(removePreset(index))}
            onUpdatePreset={(index: number) => dispatch(updatePreset(index))}
            onRenamePreset={(index: number, name: string) => dispatch(renamePreset({ index, name }))}
            onSelectPreset={(preset: Preset | null) => dispatch(selectPreset(preset))}
            onExportPreset={(preset: Preset) => console.log(preset)}
        />
    )
}
