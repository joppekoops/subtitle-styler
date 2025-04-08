import { FC, ReactElement } from 'react'

import './Styling.scss'
import { Tab } from '../../components/Tab/Tab'
import { Tabs } from '../../components/Tabs/Tabs'

export interface StylingProps {
    className?: string
}

export const Styling: FC<StylingProps> = ({
  className = '',
}): ReactElement => (
    <div className={`styling ${className}`}>
        <Tabs>
            <Tab name={'Text'}>Text</Tab>
            <Tab name={'Global Styles'}>
                <h2 className="sr-only">Global Styles</h2>
                <form>
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

                    <section className="styling__section">
                        <h3>Typography</h3>

                        <div className="styling__control-row">
                            <label>
                                <span className="sr-only">Font family</span>
                                <select name="font-family">
                                    <option value="">Font</option>
                                    <option value="">Font</option>
                                    <option value="">Font</option>
                                </select>
                            </label>
                        </div>

                        <div className="styling__control-row">
                            <label>
                                <input type="checkbox" name="bold" />
                                Bold
                            </label>
                            <label>
                                <input type="checkbox" name="italics" />
                                Italic
                            </label>
                            <label>
                                <input type="checkbox" name="underline" />
                                Underline
                            </label>
                        </div>

                        <div className="styling__control-row">
                            <label>
                                Font size
                                <input type="range" name="font-size" />
                            </label>
                        </div>

                        <div className="styling__control-row">
                            <fieldset role="radiogroup">
                                <legend>Alignment</legend>
                                <label>
                                    <input type="radio" name="alignment" value="left" />
                                    Left
                                </label>
                                <label>
                                    <input type="radio" name="alignment" value="center" defaultChecked />
                                    Center
                                </label>
                                <label>
                                    <input type="radio" name="alignment" value="right" />
                                    Right
                                </label>
                            </fieldset>
                        </div>

                        <div className="styling__control-row">
                            <label>
                                Fill
                                <input type="color" name="fill" />
                            </label>
                            <label>
                                Stroke
                                <input type="color" name="stroke" />
                            </label>
                        </div>
                    </section>

                    <section className="styling__section">
                        <h3>Box</h3>

                        <div className="styling__control-row">
                            <label>
                                Background color
                                <input type="color" name="background-color" />
                            </label>
                        </div>

                        <div className="styling__control-row">
                            <label>
                                Opacity
                                <input type="range" name="background-opacity" />
                            </label>
                        </div>

                        <div className="styling__control-row">
                            <fieldset>
                                <legend>Padding</legend>
                                <label>
                                    <span className="sr-only">Top</span>
                                    <input type="number" name="padding-top" />
                                </label>
                                <label>
                                    <span className="sr-only">Right</span>
                                    <input type="number" name="padding-right" />
                                </label>
                                <label>
                                    <span className="sr-only">Bottom</span>
                                    <input type="number" name="padding-bottom" />
                                </label>
                                <label>
                                    <span className="sr-only">Left</span>
                                    <input type="number" name="padding-left" />
                                </label>
                            </fieldset>
                        </div>
                    </section>

                    <section className="styling__section">
                        <h3>Shadow</h3>
                        <div>
                            <div className="styling__control-row">
                                <label>
                                    Color
                                    <input type="color" name="shadow-color[]" />
                                </label>
                            </div>
                            <div className="styling__control-row">
                                <label>
                                    X offset
                                    <input type="range" name="shadow-offset-x[]" />
                                </label>
                                <label>
                                    Y offset
                                    <input type="range" name="shadow-offset-y[]" />
                                </label>
                            </div>
                            <div className="styling__control-row">
                                <label>
                                    Blur
                                    <input type="range" name="shadow-blur[]" />
                                </label>
                                <label>
                                    Spread
                                    <input type="range" name="shadow-spread[]" />
                                </label>
                            </div>
                        </div>
                        <div>
                            <div className="styling__control-row">
                                <label>
                                    Color
                                    <input type="color" name="shadow-color[]" />
                                </label>
                            </div>
                            <div className="styling__control-row">
                                <label>
                                    X offset
                                    <input type="range" name="shadow-offset-x[]" />
                                </label>
                                <label>
                                    Y offset
                                    <input type="range" name="shadow-offset-y[]" />
                                </label>
                            </div>
                            <div className="styling__control-row">
                                <label>
                                    Blur
                                    <input type="range" name="shadow-blur[]" />
                                </label>
                                <label>
                                    Spread
                                    <input type="range" name="shadow-spread[]" />
                                </label>
                            </div>
                        </div>
                    </section>

                    <section className="styling__section">
                        <h3>Transitions</h3>

                        <div className="styling__transition-container">
                            <fieldset className="styling__transition styling__transition-start">
                                <legend>Start</legend>
                                <label>
                                    <span className="sr-only">Preset</span>
                                    <select name="start-transition-preset">
                                        <option value="">Preset</option>
                                        <option value="">Preset</option>
                                        <option value="">Preset</option>
                                    </select>
                                </label>

                                <label>
                                    <span className="sr-only">Duration</span>
                                    <input type="number" name="start-transition-duration" />
                                </label>

                                <label>
                                    <span className="sr-only">Easing</span>
                                    <select name="start-transition-easing">
                                        <option value="">Easing</option>
                                        <option value="">Easing</option>
                                        <option value="">Easing</option>
                                    </select>
                                </label>
                            </fieldset>
                            <fieldset className="styling__transition styling__transition-end">
                                <legend>End</legend>
                                <label>
                                    <span className="sr-only">Preset</span>
                                    <select name="end-transition-preset">
                                        <option value="">Preset</option>
                                        <option value="">Preset</option>
                                        <option value="">Preset</option>
                                    </select>
                                </label>

                                <label>
                                    <span className="sr-only">Duration</span>
                                    <input type="number" name="end-transition-duration" />
                                </label>

                                <label>
                                    <span className="sr-only">Easing</span>
                                    <select name="end-transition-easing">
                                        <option value="">Easing</option>
                                        <option value="">Easing</option>
                                        <option value="">Easing</option>
                                    </select>
                                </label>
                            </fieldset>
                        </div>
                    </section>
                </form>
            </Tab>
            <Tab name={'Export'}>Export</Tab>
        </Tabs>
    </div>
)
