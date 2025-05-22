import { FC, ReactElement, useEffect } from 'react'

import { useTypedSelector } from '@app-redux'
import { captionStylesToCss, toKebabCase } from '@app-helpers'
import { Tab, Tabs } from '@app-components'
import { ConnectedCueStyles, ConnectedGlobalStyles, ConnectedPresets, ConnectedTextControls } from '@app-connectors'

import './Styling.scss'

export interface StylingProps {
    className?: string
}

export const Styling: FC<StylingProps> = ({
    className = '',
}): ReactElement => {
    const { cueStyleElement, globalStyles, presets } = useTypedSelector((state) => state.styleSlice)
    const { cues } = useTypedSelector((state) => state.cueSlice)

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

    }, [globalStyles, presets, cueStyleElement])

    useEffect(() => {
        cues.forEach(cue => {
            cue.position = globalStyles.position.horizontal
            cue.line = globalStyles.position.vertical || 0
            cue.snapToLines = globalStyles.position.useLines
        })
    }, [globalStyles.position])

    useEffect(() => {
        cues.forEach(cue => {
            cue.align = globalStyles.alignment
        })
    }, [globalStyles.alignment])

    return (
        <div className={`styling ${className}`}>
            <Tabs>
                <Tab name={'Text'}>
                    <h2 className="sr-only">Text</h2>
                    <ConnectedTextControls />
                </Tab>
                <Tab name="Global Styles">
                    <h2 className="sr-only">Global Styles</h2>

                    <section className="styling__section">
                        <h3>Preset</h3>
                        <ConnectedPresets />
                    </section>

                    <ConnectedGlobalStyles />
                </Tab>
                <Tab name="Cue Styles">
                    <h2 className="sr-only">Cue Styles</h2>
                    <ConnectedCueStyles />
                </Tab>
                <Tab name="Export">Export</Tab>
            </Tabs>
        </div>
    )
}
