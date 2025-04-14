import { FC, ReactElement } from 'react'

import { GlobalStyles } from '@app-compositions'
import { Tab, Tabs } from '@app-components'

import './Styling.scss'

export interface StylingProps {
    className?: string
}

export const Styling: FC<StylingProps> = ({
    className = '',
}): ReactElement => {

    return (
        <div className={`styling ${className}`}>
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

                    <GlobalStyles></GlobalStyles>
                </Tab>
                <Tab name={'Export'}>Export</Tab>
            </Tabs>
        </div>
    )
}
