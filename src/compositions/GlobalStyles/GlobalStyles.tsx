import { ChangeEvent, FC, ReactElement } from 'react'

import { addShadow, removeShadow, updateGlobalStyles, useTypedDispatch, useTypedSelector } from '@app-redux'
import { Icon, OptionsBar, ToggleButton, ShadowControls } from '@app-components'

import './GlobalStyles.scss'

export interface GlobalStylesProps {
    className?: string
}

export const GlobalStyles: FC<GlobalStylesProps> = ({
    className = '',
}): ReactElement => {
    const dispatch = useTypedDispatch()
    const { globalStyles } = useTypedSelector((state) => state.styleSlice)

    const handleInput = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        dispatch(updateGlobalStyles({
            key: event.target.name,
            value: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
        }))
    }

    const handleAddShadow = () => {
        dispatch(addShadow({}))
    }

    const handleRemoveShadow = (index: number) => {
        dispatch(removeShadow(index))
    }

    return (
        <form className={`global-styles ${className}`}>
            <section className="global-styles__section">
                <h3>Typography</h3>

                <div className="global-styles__control-row">
                    <label className="full-width">
                        <span className="sr-only">Font family</span>
                        <select name="fontFamily" value={globalStyles.fontFamily} onChange={handleInput}>
                            <option value="sans-serif">Sans Serif</option>
                            <option value="serif">Serif</option>
                            <option value="monospace">Monospace</option>
                            <option value="fantasy">Fantasy</option>
                        </select>
                    </label>
                </div>

                <div className="global-styles__control-row">
                    <label className="full-width">
                        <span className="sr-only">Font variant</span>
                        <select name="fontVariant" value={globalStyles.fontVariant} onChange={handleInput}>
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
                    <ToggleButton name="bold"
                                  value="bold"
                                  checked={globalStyles.bold}
                                  onChange={handleInput}
                    >
                        <Icon name="bold" aria-label="bold" />
                    </ToggleButton>
                    <ToggleButton name="italics"
                                  value="italics"
                                  checked={globalStyles.italics}
                                  onChange={handleInput}
                    >
                        <Icon name="italics" aria-label="italics" />
                    </ToggleButton>
                    <ToggleButton name="underline"
                                  value="underline"
                                  checked={globalStyles.underline}
                                  onChange={handleInput}
                    >
                        <Icon name="underline" aria-label="underline" />
                    </ToggleButton>
                </div>

                <div className="global-styles__control-row">
                    <label className="full-width">
                        Font size
                        <input
                            type="range"
                            name="fontSize"
                            min={14}
                            max={128}
                            value={globalStyles.fontSize}
                            onChange={handleInput}
                        />
                    </label>
                </div>

                <div className="global-styles__control-row">
                    <OptionsBar label="Alignment">
                        <ToggleButton
                            name="alignment"
                            value="left"
                            type="radio"
                            checked={globalStyles.alignment === 'left' || globalStyles.alignment === 'start'}
                            onChange={handleInput}
                        >
                            <Icon name="alignLeft" aria-label="left" />
                        </ToggleButton>
                        <ToggleButton
                            name="alignment"
                            value="center"
                            type="radio"
                            checked={globalStyles.alignment === 'center' || ! globalStyles.alignment}
                            onChange={handleInput}
                        >
                            <Icon name="alignCenter" aria-label="center" />
                        </ToggleButton>
                        <ToggleButton
                            name="alignment"
                            value="right"
                            type="radio"
                            checked={globalStyles.alignment === 'right' || globalStyles.alignment === 'end'}
                            onChange={handleInput}
                        >
                            <Icon name="alignRight" aria-label="right" />
                        </ToggleButton>
                    </OptionsBar>
                </div>

                <div className="global-styles__control-row">
                    <label>
                        Fill
                        <input type="color" name="fill" value={globalStyles.fill} onChange={handleInput}
                        />
                    </label>
                    <label>
                        Stroke
                        <input type="color"
                               name="stroke.color"
                               value={globalStyles.stroke.color}
                               onChange={handleInput}
                        />
                    </label>
                    <label>
                        <span className="sr-only">Stroke width</span>
                        <input type="number"
                               name="stroke.width"
                               min={0}
                               value={globalStyles.stroke.width}
                               onChange={handleInput}
                        />
                    </label>
                </div>
            </section>

            <section className="global-styles__section">
                <h3>Position</h3>

                <div className="global-styles__control-row">
                    <label className="full-width">
                        Horizontal
                        <input type="range"
                               name="position.horizontal"
                               value={globalStyles.position.horizontal}
                               onChange={handleInput}
                        />
                    </label>
                </div>

                {globalStyles.position.useLines
                    ?
                    <div className="global-styles__control-row">
                        <label>
                            Vertical
                            <input type="number"
                                   name="position.vertical"
                                   value={globalStyles.position.vertical}
                                   onChange={handleInput}
                            />
                        </label>
                    </div>

                    :
                    <div className="global-styles__control-row">
                        <label className="full-width">
                            Vertical
                            <input type="range"
                                   name="position.vertical"
                                   value={globalStyles.position.vertical}
                                   onChange={handleInput}
                            />
                        </label>
                    </div>
                }

                <div className="global-styles__control-row">
                    <label>
                        <input type="checkbox"
                               name="position.useLines"
                               checked={globalStyles.position.useLines}
                               onChange={handleInput}
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
                        <input type="color"
                               name="box.color"
                               value={globalStyles.box.color}
                               onChange={handleInput}
                        />
                    </label>
                </div>

                <div className="global-styles__control-row">
                    <label className="full-width">
                        Opacity
                        <input type="range"
                               name="box.opacity"
                               min={0}
                               max={255}
                               value={globalStyles.box.opacity}
                               onChange={handleInput}
                        />
                    </label>
                </div>

                <div className="global-styles__control-row">
                    <fieldset className="global-styles__padding-controls">
                        <legend>Padding</legend>
                        <label>
                            <span className="sr-only">Top</span>
                            <input type="number"
                                   name="box.padding.top"
                                   value={globalStyles.box.padding.top}
                                   onChange={handleInput}
                                   min={0}
                            />
                        </label>
                        <label>
                            <span className="sr-only">Right</span>
                            <input type="number"
                                   name="box.padding.right"
                                   value={globalStyles.box.padding.right}
                                   onChange={handleInput}
                                   min={0}
                            />
                        </label>
                        <label>
                            <span className="sr-only">Bottom</span>
                            <input type="number"
                                   name="box.padding.bottom"
                                   value={globalStyles.box.padding.bottom}
                                   onChange={handleInput}
                                   min={0}
                            />
                        </label>
                        <label>
                            <span className="sr-only">Left</span>
                            <input type="number"
                                   name="box.padding.left"
                                   value={globalStyles.box.padding.left}
                                   onChange={handleInput}
                                   min={0}
                            />
                        </label>
                    </fieldset>
                </div>
            </section>

            <section className="global-styles__section">
                <h3>Shadow</h3>

                {
                    globalStyles.shadow.map((shadow, index) => (
                        <ShadowControls key={index}
                                        shadowStyles={shadow}
                                        index={index}
                                        onRemoveShadow={handleRemoveShadow}
                                        onChange={handleInput}
                        />
                    ))
                }

                <div className="controls-row">
                    <button type="button" className="button" onClick={handleAddShadow}>Add Shadow</button>
                </div>
            </section>

            <section className="global-styles__section">
                <h3>Transitions</h3>

                <div className="global-styles__transition-container">
                    <fieldset className="global-styles__transition-controls global-styles__transition-start">
                        <legend>Start</legend>
                        <label>
                            <span className="sr-only">Preset</span>
                            <select name="transition.start.preset"
                                    value={globalStyles.transition.start.preset}
                                    onChange={handleInput}
                            >
                                <option value="none">None</option>
                                <option value="fade-in">Fade-in</option>
                            </select>
                        </label>

                        <label>
                            <span className="sr-only">Duration</span>
                            <input type="number"
                                   name="transition.start.duration"
                                   min={0}
                                   value={globalStyles.transition.start.duration}
                                   onChange={handleInput}
                            />
                        </label>

                        <label>
                            <span className="sr-only">Easing</span>
                            <select name="transtition.start.easing"
                                    value={globalStyles.transition.start.easing}
                                    onChange={handleInput}
                            >
                                <option value="linear">Linear</option>
                                <option value="ease">Ease</option>
                                <option value="ease-in">Ease-in</option>
                                <option value="ease-out">Ease-out</option>
                                <option value="ease-in-out">Ease-in-out</option>
                            </select>
                        </label>
                    </fieldset>

                    <fieldset className="global-styles__transition-controls global-styles__transition-end">
                        <legend>End</legend>
                        <label>
                            <span className="sr-only">Preset</span>
                            <select name="transition.end.preset"
                                    value={globalStyles.transition.end.preset}
                                    onChange={handleInput}
                            >
                                <option value="none">None</option>
                                <option value="fade-out">Fade-out</option>
                            </select>
                        </label>

                        <label>
                            <span className="sr-only">Duration</span>
                            <input type="number"
                                   name="transition.end.duration"
                                   min={0}
                                   value={globalStyles.transition.end.duration}
                                   onChange={handleInput}
                            />
                        </label>

                        <label>
                            <span className="sr-only">Easing</span>
                            <select name="transtition.start.easing"
                                    value={globalStyles.transition.end.easing}
                                    onChange={handleInput}
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
