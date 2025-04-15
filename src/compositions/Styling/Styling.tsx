import { FC, ReactElement, useEffect, useRef } from 'react'

import {
    addPreset,
    removePreset,
    renamePreset,
    updatePreset,
    useTypedSelector,
    useTypedDispatch,
    selectPreset,
} from '@app-redux'
import { captionStylesToCss } from '@app-helpers'
import { GlobalStyles, Presets } from '@app-compositions'
import { Tab, Tabs } from '@app-components'

import './Styling.scss'

export interface StylingProps {
    className?: string
}

export const Styling: FC<StylingProps> = ({
    className = '',
}): ReactElement => {
    const { globalStyles, presets, selectedPresetId } = useTypedSelector((state) => state.styleSlice)
    const { cues } = useTypedSelector((state) => state.cueSlice)

    const dispatch = useTypedDispatch()

    // TODO: where to put this?
    const stylesElement = useRef<HTMLStyleElement>(null)

    useEffect(() => {
        if (! stylesElement.current) {
            return
        }

        stylesElement.current.innerHTML = captionStylesToCss(globalStyles, '.cue__text')

        cues.forEach(cue => {
            cue.position = globalStyles.position.horizontal
            cue.line = globalStyles.position.vertical
            cue.snapToLines = globalStyles.position.useLines
            cue.align = globalStyles.alignment
        })

    }, [globalStyles, stylesElement.current])

    return (
        <div className={`styling ${className}`}>
            <style ref={stylesElement}></style>
            <Tabs>
                <Tab name={'Text'}>Text</Tab>
                <Tab name={'Global Styles'}>
                    <h2 className="sr-only">Global Styles</h2>

                    <section className="styling__section">
                        <h3>Preset</h3>
                        <Presets
                            presets={presets}
                            selectedPresetId={selectedPresetId}
                            onAddPreset={(name: string) => dispatch(addPreset(name))}
                            onRemovePreset={(index: number) => dispatch(removePreset(index))}
                            onUpdatePreset={(index: number) => dispatch(updatePreset(index))}
                            onRenamePreset={(index: number, name: string) => dispatch(renamePreset({ index, name }))}
                            onSelectPreset={(index: number | null) => dispatch(selectPreset(index))}
                            onExportPreset={(index: number) => console.log(presets[index])}
                        />
                    </section>

                    <GlobalStyles />
                </Tab>
                <Tab name={'Export'}>Export</Tab>
            </Tabs>
        </div>
    )
}
