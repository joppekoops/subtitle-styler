import { cloneDeep } from 'lodash'
import { FC } from 'react'

import { Presets } from '@app-compositions'
import {
    addEmptyPreset,
    addPreset,
    importPreset,
    removePreset,
    renamePreset,
    selectPreset,
    updatePreset,
    useTypedDispatch,
    useTypedSelector,
} from '@app-redux'
import { Preset } from '@app-entities'
import { addSuffixIfNameExists, exportAsFile, fileReadText, importFile, isPreset, toKebabCase } from '@app-helpers'

export const ConnectedPresets: FC = () => {
    const { presets, selectedPreset, globalStyles } = useTypedSelector((state) => state.styleSlice)

    const dispatch = useTypedDispatch()

    const handleImportPreset = async () => {
        try {
            const file = await importFile(
                [
                    {
                        description: 'Caption Styler preset files',
                        accept: {
                            'text/*': ['.cspreset'],
                        },
                    },
                ],
            )

            if (! file) {
                return
            }

            const json = await fileReadText(file)
            const preset = JSON.parse(json)

            if (! isPreset(preset)) {
                throw new SyntaxError()
            }

            preset.name = addSuffixIfNameExists(preset.name, presets)
            preset.builtIn = false
            dispatch(importPreset(preset))

        } catch (error) {
            if (error instanceof DOMException) {
                switch (error.name) {
                    case 'AbortError':
                        return
                    default:
                        console.error(error)
                        return
                }
            } else if (error instanceof SyntaxError) {
                console.log('not a preset')
            } else {
                console.error(error)
            }
        }
    }

    const handleExportPreset = (preset: Preset) => {
        const presetToSave = cloneDeep(preset)
        delete presetToSave.builtIn

        exportAsFile(
            JSON.stringify(presetToSave),
            `${toKebabCase(presetToSave.name)}.cspreset`,
            [{ description: 'Caption Styler preset', accept: { 'application/json': ['.cspreset'] } }],
        )
    }

    return (
        <Presets
            presets={presets}
            selectedPreset={selectedPreset}
            globalStyles={globalStyles}
            onAddPreset={(name: string) => dispatch(addPreset(name))}
            onAddEmptyPreset={(name: string) => dispatch(addEmptyPreset(name))}
            onRemovePreset={(index: number) => dispatch(removePreset(index))}
            onUpdatePreset={(index: number) => dispatch(updatePreset(index))}
            onRenamePreset={(index: number, name: string) => dispatch(renamePreset({ index, name }))}
            onSelectPreset={(preset: Preset | null) => dispatch(selectPreset(preset))}
            onExportPreset={handleExportPreset}
            onImportPreset={handleImportPreset}
        />
    )
}
