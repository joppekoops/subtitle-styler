import { ChangeEvent, FC, ReactElement } from 'react'

import { CaptionStyles } from '@app-entities'
import { Icon, OptionsBar, ToggleButton, ShadowControls, RangeSlider, AccessibilityWarningCard } from '@app-components'
import { checkColorContrast } from '@app-a11y'
import { PositionControls } from '@app-compositions'

import './GlobalStyles.scss'

export interface GlobalStylesProps {
    globalStyles: CaptionStyles
    onInput: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    onAddShadow: () => void
    onRemoveShadow: (index: number) => void
    className?: string
}

export const GlobalStyles: FC<GlobalStylesProps> = ({
    globalStyles,
    onInput,
    onAddShadow,
    onRemoveShadow,
    className = '',
}): ReactElement => (
    <div className={`global-styles ${className}`}>
        <form className={`global-styles__form ${className}`}>
            <section className="global-styles__section">
                <h3>Typography</h3>

                <div className="global-styles__control-row">
                    <label className="full-width">
                        <span className="sr-only">Font family</span>
                        <select name="fontFamily" value={globalStyles.fontFamily} onChange={onInput}>
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
                        <select name="fontVariant" value={globalStyles.fontVariant} onChange={onInput}>
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
                    <ToggleButton
                        name="italics"
                        value="italics"
                        checked={globalStyles.italics}
                        onChange={onInput}
                    >
                        <Icon name="italics" aria-label="italics" />
                    </ToggleButton>
                    <ToggleButton
                        name="underline"
                        value="underline"
                        checked={globalStyles.underline}
                        onChange={onInput}
                    >
                        <Icon name="underline" aria-label="underline" />
                    </ToggleButton>
                </div>

                <div className="global-styles__control-row">
                    <RangeSlider
                        label="Font size"
                        name="fontSize"
                        min={14}
                        max={64}
                        markers={[16]}
                        value={globalStyles.fontSize}
                        onChange={onInput}
                        className="full-width"
                    />
                </div>

                <div className="global-styles__control-row">
                    <OptionsBar label="Alignment">
                        <ToggleButton
                            name="alignment"
                            value="left"
                            type="radio"
                            checked={globalStyles.alignment === 'left' || globalStyles.alignment === 'start'}
                            onChange={onInput}
                        >
                            <Icon name="alignLeft" aria-label="left" />
                        </ToggleButton>
                        <ToggleButton
                            name="alignment"
                            value="center"
                            type="radio"
                            checked={globalStyles.alignment === 'center' || ! globalStyles.alignment}
                            onChange={onInput}
                        >
                            <Icon name="alignCenter" aria-label="center" />
                        </ToggleButton>
                        <ToggleButton
                            name="alignment"
                            value="right"
                            type="radio"
                            checked={globalStyles.alignment === 'right' || globalStyles.alignment === 'end'}
                            onChange={onInput}
                        >
                            <Icon name="alignRight" aria-label="right" />
                        </ToggleButton>
                    </OptionsBar>
                </div>

                <div className="global-styles__control-row">
                    <AccessibilityWarningCard
                        warnings={[checkColorContrast(globalStyles.fill, globalStyles.box.color, globalStyles.stroke.color, globalStyles.stroke.width)]}
                        className="global-styles__warning"
                    />
                    <label>
                        Fill
                        <input
                            type="color"
                            name="fill"
                            value={globalStyles.fill}
                            onChange={onInput}
                        />
                    </label>
                    <label>
                        Stroke
                        <input
                            type="color"
                            name="stroke.color"
                            value={globalStyles.stroke.color}
                            onChange={onInput}
                        />
                    </label>
                    <label>
                        <span className="sr-only">Stroke width</span>
                        <input
                            type="number"
                            name="stroke.width"
                            min={0}
                            value={globalStyles.stroke.width}
                            onChange={onInput}
                        />
                    </label>
                </div>
            </section>

            <PositionControls
                position={globalStyles.position}
                onInput={onInput}
                className="global-styles__section"
            />

            <section className="global-styles__section">
                <h3>Box</h3>

                <div className="global-styles__control-row">
                    <label>
                        Background color
                        <input
                            type="color"
                            name="box.color"
                            value={globalStyles.box.color}
                            onChange={onInput}
                        />
                    </label>
                </div>

                <div className="global-styles__control-row">
                    <RangeSlider
                        label="Opacity"
                        name="box.opacity"
                        min={0}
                        max={255}
                        value={globalStyles.box.opacity}
                        onChange={onInput}
                        className="full-width"
                    />
                </div>

                <div className="global-styles__control-row">
                    <fieldset className="global-styles__padding-controls">
                        <legend>Padding</legend>
                        <label>
                            <span className="sr-only">Top</span>
                            <input
                                type="number"
                                name="box.padding.top"
                                value={globalStyles.box.padding.top}
                                onChange={onInput}
                                min={0}
                                className="global-styles__padding-controls-input"
                            />
                        </label>
                        <label>
                            <span className="sr-only">Right</span>
                            <input
                                type="number"
                                name="box.padding.right"
                                value={globalStyles.box.padding.right}
                                onChange={onInput}
                                min={0}
                                className="global-styles__padding-controls-input"
                            />
                        </label>
                        <label>
                            <span className="sr-only">Bottom</span>
                            <input
                                type="number"
                                name="box.padding.bottom"
                                value={globalStyles.box.padding.bottom}
                                onChange={onInput}
                                min={0}
                                className="global-styles__padding-controls-input"
                            />
                        </label>
                        <label>
                            <span className="sr-only">Left</span>
                            <input
                                type="number"
                                name="box.padding.left"
                                value={globalStyles.box.padding.left}
                                onChange={onInput}
                                min={0}
                                className="global-styles__padding-controls-input"
                            />
                        </label>
                    </fieldset>
                </div>
            </section>

            <section className="global-styles__section">
                <h3>Shadow</h3>

                {
                    globalStyles.shadow.map((shadow, index) => (
                        <ShadowControls
                            key={index}
                            shadowStyles={shadow}
                            index={index}
                            onRemoveShadow={onRemoveShadow}
                            onChange={onInput}
                        />
                    ))
                }

                <div className="controls-row">
                    <button type="button" className="button" onClick={onAddShadow}>Add Shadow</button>
                </div>
            </section>

            <section className="global-styles__section">
                <h3>Transitions</h3>

                <div className="global-styles__transition-container">
                    <fieldset className="global-styles__transition-controls global-styles__transition-start">
                        <legend className="global-styles__transition-controls-legend">Start</legend>
                        <label className="global-styles__transition-controls-preset">
                            <span className="sr-only">Preset</span>
                            <select
                                name="transition.start.preset"
                                value={globalStyles.transition.start.preset}
                                onChange={onInput}
                            >
                                <option value="none">None</option>
                                <option value="fade-in">Fade-in</option>
                                <option value="slide-in">Slide-in Bottom</option>
                                <option value="slide-in-top">Slide-in Top</option>
                                <option value="slide-in-left">Slide-in Left</option>
                                <option value="blur-in">Blur</option>
                                <option value="scale-up-in">Scale-up</option>
                                <option value="scale-down-in">Scale-down</option>
                            </select>
                        </label>

                        <label>
                            <span className="sr-only">Duration</span>
                            <input
                                type="number"
                                name="transition.start.duration"
                                min={0}
                                value={globalStyles.transition.start.duration}
                                onChange={onInput}
                                className="global-styles__transition-controls-input"
                            />
                        </label>

                        <label>
                            <span className="sr-only">Easing</span>
                            <select
                                name="transition.start.easing"
                                value={globalStyles.transition.start.easing}
                                onChange={onInput}
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
                        <legend className="global-styles__transition-controls-legend">End</legend>
                        <label className="global-styles__transition-controls-preset">
                            <span className="sr-only">Preset</span>
                            <select
                                name="transition.end.preset"
                                value={globalStyles.transition.end.preset}
                                onChange={onInput}
                            >
                                <option value="none">None</option>
                                <option value="fade-out">Fade-out</option>
                                <option value="slide-out">Slide-out Bottom</option>
                                <option value="slide-out-top">Slide-out Top</option>
                                <option value="slide-out-left">Slide-out Left</option>
                                <option value="blur-out">Blur</option>
                                <option value="scale-up-out">Scale-up</option>
                                <option value="scale-down-out">Scale-down</option>
                            </select>
                        </label>

                        <label>
                            <span className="sr-only">Duration</span>
                            <input
                                type="number"
                                name="transition.end.duration"
                                min={0}
                                value={globalStyles.transition.end.duration}
                                onChange={onInput}
                                className="global-styles__transition-controls-input"
                            />
                        </label>

                        <label>
                            <span className="sr-only">Easing</span>
                            <select
                                name="transition.end.easing"
                                value={globalStyles.transition.end.easing}
                                onChange={onInput}
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
    </div>
)
