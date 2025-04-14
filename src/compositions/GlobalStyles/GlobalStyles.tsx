import { FC, FormEvent, ReactElement } from 'react'
import { updateGlobalStyles, useTypedDispatch, useTypedSelector } from '@app-redux'

import { Icon, OptionsBar, ToggleButton } from '@app-components'

import './GlobalStyles.scss'

export interface GlobalStylesProps {
    className?: string
}

export const GlobalStyles: FC<GlobalStylesProps> = ({
    className = '',
}): ReactElement => {
    const dispatch = useTypedDispatch()
    const { globalStyles } = useTypedSelector((state) => state.styleSlice)

    const handleInput = (event: FormEvent) => {
        const input = event.target as HTMLInputElement
        if (input.type === 'checkbox') {
            input.value = input.checked ? 'true' : 'false'
        }
        dispatch(updateGlobalStyles({ key: input.name, value: input.value }))
    }

    return (
        <form onInput={handleInput} className={`global-styles ${className}`}>
            <section className="global-styles__section">
                <h3>Typography</h3>

                <div className="global-styles__control-row">
                    <label>
                        <span className="sr-only">Font family</span>
                        <select name="fontFamily" defaultValue={globalStyles.fontFamily}>
                            <option value="sans-serif">Sans Serif</option>
                            <option value="serif">Serif</option>
                            <option value="monospace">Monospace</option>
                            <option value="fantsasy">Fantasy</option>
                        </select>
                    </label>
                </div>

                <div className="global-styles__control-row">
                    <label>
                        <span className="sr-only">Font variant</span>
                        <select name="fontVariant" defaultValue={globalStyles.fontVariant}>
                            <option value="100">Thin</option>
                            <option value="200">Extra Light</option>
                            <option value="300">Light</option>
                            <option value="400">Normal</option>
                            <option value="500">Medium</option>
                            <option value="600">Semi Bold</option>
                            <option value="700">Bold</option>
                            <option value="800">Extra Bold</option>
                            <option value="900">Black</option>
                        </select>
                    </label>
                    <ToggleButton name="bold" value="bold">
                        <Icon name="bold" aria-label="bold" />
                    </ToggleButton>
                    <ToggleButton name="italics" value="italics">
                        <Icon name="italics" aria-label="italics" />
                    </ToggleButton>
                    <ToggleButton name="underline" value="underline">
                        <Icon name="underline" aria-label="underline" />
                    </ToggleButton>
                </div>

                <div className="global-styles__control-row">
                    <label>
                        Font size
                        <input type="range"
                               name="fontSize"
                               min={14}
                               max={128}
                               defaultValue={globalStyles.fontSize}
                        />
                    </label>
                </div>

                <div className="global-styles__control-row">
                    <OptionsBar label="Alignment">
                        <ToggleButton name="alignment"
                                      value="left"
                                      type="radio"
                                      defaultChecked={globalStyles.alignment === 'left' || globalStyles.alignment === 'start'}
                        >
                            <Icon name="alignLeft" aria-label="left" />
                        </ToggleButton>
                        <ToggleButton name="alignment"
                                      value="center"
                                      type="radio"
                                      defaultChecked={globalStyles.alignment === 'center' || ! globalStyles.alignment}
                        >
                            <Icon name="alignCenter" aria-label="center" />
                        </ToggleButton>
                        <ToggleButton name="alignment"
                                      value="right"
                                      type="radio"
                                      defaultChecked={globalStyles.alignment === 'right' || globalStyles.alignment === 'end'}
                        >
                            <Icon name="alignRight" aria-label="right" />
                        </ToggleButton>
                    </OptionsBar>
                </div>

                <div className="global-styles__control-row">
                    <label>
                        Fill
                        <input type="color" name="fill" defaultValue={globalStyles.fill} />
                    </label>
                    <label>
                        Stroke
                        <input type="color" name="stroke.color" defaultValue={globalStyles.stroke.color} />
                    </label>
                    <label>
                        <span className="sr-only">Stroke width</span>
                        <input type="number"
                               name="stroke.width"
                               min={0}
                               defaultValue={globalStyles.stroke.width}
                        />
                    </label>
                </div>
            </section>

            <section className="global-styles__section">
                <h3>Position</h3>

                <div className="global-styles__control-row">
                    <label>
                        Horizontal
                        <input type="range"
                               name="position.horizontal"
                               defaultValue={globalStyles.position.horizontal}
                        />
                    </label>
                </div>

                <div className="global-styles__control-row">
                    <label>
                        Vertical
                        <input type="range"
                               name="position.vertical"
                               defaultValue={globalStyles.position.vertical}
                        />
                    </label>
                </div>

                <div className="global-styles__control-row">
                    <label>
                        <input type="checkbox"
                               name="position.useLines"
                               defaultChecked={globalStyles.position.useLines}
                        />
                        Use Lines
                    </label>
                </div>
            </section>

            <section className="global-styles__section">
                <h3>Box</h3>

                <div className="global-styles__control-row">
                    <label>
                        Background color
                        <input type="color" name="box.color" defaultValue={globalStyles.box.color} />
                    </label>
                </div>

                <div className="global-styles__control-row">
                    <label>
                        Opacity
                        <input type="range"
                               name="box.opacity"
                               min={0}
                               max={1}
                               step={0.01}
                               defaultValue={globalStyles.box.opacity}
                        />
                    </label>
                </div>

                <div className="global-styles__control-row">
                    <fieldset>
                        <legend>Padding</legend>
                        <label>
                            <span className="sr-only">Top</span>
                            <input type="number"
                                   name="box.padding.top"
                                   defaultValue={globalStyles.box.padding.top}
                            />
                        </label>
                        <label>
                            <span className="sr-only">Right</span>
                            <input type="number"
                                   name="box.padding.right"
                                   defaultValue={globalStyles.box.padding.right}
                            />
                        </label>
                        <label>
                            <span className="sr-only">Bottom</span>
                            <input type="number"
                                   name="box.padding.bottom"
                                   defaultValue={globalStyles.box.padding.bottom}
                            />
                        </label>
                        <label>
                            <span className="sr-only">Left</span>
                            <input type="number"
                                   name="box.padding.left"
                                   defaultValue={globalStyles.box.padding.left}
                            />
                        </label>
                    </fieldset>
                </div>
            </section>

            <section className="global-styles__section">
                <h3>Shadow</h3>

                {
                    globalStyles.shadow.map((shadow, index) => (
                        <div key={index}>
                            <div className="global-styles__control-row">
                                <label>
                                    Color
                                    <input type="color"
                                           name={`shadow[${index}].color`}
                                           defaultValue={shadow.color}
                                    />
                                </label>
                            </div>

                            <div className="global-styles__control-row">
                                <label>
                                    X offset
                                    <input type="range"
                                           name={`shadow[${index}].offsetX`}
                                           defaultValue={shadow.offsetX}
                                    />
                                </label>
                                <label>
                                    Y offset
                                    <input type="range"
                                           name={`shadow[${index}].offsetY`}
                                           defaultValue={shadow.offsetY}
                                    />
                                </label>
                            </div>

                            <div className="global-styles__control-row">
                                <label>
                                    Blur
                                    <input type="range"
                                           name={`shadow[${index}].blur`}
                                           defaultValue={shadow.blur}
                                    />
                                </label>
                                <label>
                                    Spread
                                    <input type="range"
                                           name={`shadow[${index}].spread`}
                                           defaultValue={shadow.spread}
                                    />
                                </label>
                            </div>
                        </div>
                    ))
                }
            </section>

            <section className="global-styles__section">
                <h3>Transitions</h3>

                <div className="global-styles__transition-container">
                    <fieldset className="global-styles__transition global-styles__transition-start">
                        <legend>Start</legend>
                        <label>
                            <span className="sr-only">Preset</span>
                            <select name="transition.start.preset"
                                    defaultValue={globalStyles.transition.start.preset}
                            >
                                <option value="">Preset</option>
                                <option value="">Preset</option>
                                <option value="">Preset</option>
                            </select>
                        </label>

                        <label>
                            <span className="sr-only">Duration</span>
                            <input type="number"
                                   name="transition.start.duration"
                                   min={0}
                                   defaultValue={globalStyles.transition.start.duration}
                            />
                        </label>

                        <label>
                            <span className="sr-only">Easing</span>
                            <select name="transtition.start.easing"
                                    defaultValue={globalStyles.transition.start.easing}
                            >
                                <option value="linear">Linear</option>
                                <option value="ease">Ease</option>
                                <option value="ease-in">Ease-in</option>
                                <option value="ease-out">Ease-out</option>
                                <option value="ease-in-out">Ease-in-out</option>
                            </select>
                        </label>
                    </fieldset>

                    <fieldset className="global-styles__transition global-styles__transition-end">
                        <legend>End</legend>
                        <label>
                            <span className="sr-only">Preset</span>
                            <select name="transition.end.preset"
                                    defaultValue={globalStyles.transition.end.preset}
                            >
                                <option value="">Preset</option>
                                <option value="">Preset</option>
                                <option value="">Preset</option>
                            </select>
                        </label>

                        <label>
                            <span className="sr-only">Duration</span>
                            <input type="number"
                                   name="transition.end.duration"
                                   min={0}
                                   defaultValue={globalStyles.transition.end.duration}
                            />
                        </label>

                        <label>
                            <span className="sr-only">Easing</span>
                            <select name="transtition.start.easing"
                                    defaultValue={globalStyles.transition.end.easing}
                            >
                                <option value="linear">Linear</option>
                                <option value="ease">Ease</option>
                                <option value="ease-in">Ease-in</option>
                                <option value="ease-out">Ease-out</option>
                                <option value="ease-in-out">Ease-in-out</option>
                            </select>
                        </label>
                    </fieldset>
                </div>
            </section>
        </form>
    )
}
