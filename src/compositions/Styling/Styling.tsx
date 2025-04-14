import { FC, ReactElement, useEffect, useRef } from 'react'

import { GlobalStyles } from '@app-compositions'
import { Tab, Tabs } from '@app-components'

import './Styling.scss'
import { useTypedSelector } from '@app-redux'
import { captionStylesToCss } from '../../helpers/caption-styles-to-css'

export interface StylingProps {
    className?: string
}

export const Styling: FC<StylingProps> = ({
    className = '',
}): ReactElement => {
    const { globalStyles } = useTypedSelector((state) => state.styleSlice)
    const { cues } = useTypedSelector((state) => state.cueSlice)

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
                        <button type="button">Add preset</button>
                        <div className="styling__control-row">
                            <label>
                                <span className="sr-only">Preset</span>
                                <select name="preset">
                                    <option value="">Preset</option>
                                    <option value="">Preset</option>
                                    <option value="">Preset</option>
                                </select>
                            </label>
                        </div>
                    </section>

                    <GlobalStyles />
                </Tab>
                <Tab name={'Export'}>Export</Tab>
            </Tabs>
        </div>
    )
}
