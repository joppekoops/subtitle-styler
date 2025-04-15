import { FC, ReactElement, useEffect } from 'react'

import {
    addPreset,
    removePreset,
    renamePreset,
    updatePreset,
    useTypedSelector,
    useTypedDispatch,
    selectPreset,
} from '@app-redux'
import { captionStylesToCss, toKebabCase } from '@app-helpers'
import { GlobalStyles, Presets } from '@app-compositions'
import { Tab, Tabs } from '@app-components'
import { Preset } from '@app-entities'

import './Styling.scss'

export interface StylingProps {
    className?: string
}

export const Styling: FC<StylingProps> = ({
    className = '',
}): ReactElement => {
    const { cueStyleElement, globalStyles, presets, selectedPreset } = useTypedSelector((state) => state.styleSlice)
    const { cues } = useTypedSelector((state) => state.cueSlice)

    const dispatch = useTypedDispatch()

    useEffect(() => {
        if (! cueStyleElement) {
            return
        }

        cueStyleElement.innerHTML = captionStylesToCss(globalStyles, 'cue__text')

        presets.forEach((preset) => {
            if (! cueStyleElement) {
                return
            }

            cueStyleElement.innerHTML += captionStylesToCss(preset.styles, toKebabCase(preset.name))
        })

        cues.forEach(cue => {
            cue.position = globalStyles.position.horizontal
            cue.line = globalStyles.position.vertical
            cue.snapToLines = globalStyles.position.useLines
            cue.align = globalStyles.alignment
        })

    }, [globalStyles, presets, cueStyleElement])

    return (
        <div className={`styling ${className}`}>
            <Tabs>
                <Tab name={'Text'}>Text</Tab>
                <Tab name={'Global Styles'}>
                    <h2 className="sr-only">Global Styles</h2>

                    <section className="styling__section">
                        <h3>Preset</h3>
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
                    </section>

                    <GlobalStyles />
                </Tab>
                <Tab name={'Export'}>Export</Tab>
            </Tabs>
        </div>
    )
}
