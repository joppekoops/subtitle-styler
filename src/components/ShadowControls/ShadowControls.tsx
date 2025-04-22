import { ChangeEvent, FC, ReactElement } from 'react'

import { ShadowStyles } from '@app-entities'
import { Icon } from '@app-components'

import './ShadowControls.scss'

interface ShadowControlsProps {
    shadowStyles: ShadowStyles
    index: number
    onRemoveShadow: (index: number) => void
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    className?: string
}

export const ShadowControls: FC<ShadowControlsProps> = ({
    shadowStyles,
    index,
    onRemoveShadow,
    onChange,
    className = '',
}): ReactElement => (
    <div className={`shadow-controls ${className}`}>
        <button
            type="button"
            className="button button--negative button--icon shadow-controls__remove-button"
            onClick={() => onRemoveShadow(index)}
        >
            <Icon name="cross" />
        </button>

        <div className="global-styles__control-row">
            <label>
                Color
                <input
                    type="color"
                    name={`shadow[${index}].color`}
                    value={shadowStyles.color}
                    onChange={onChange}
                />
            </label>
        </div>

        <div className="global-styles__control-row">
            <label className="full-width">
                X offset
                <input
                    type="range"
                    name={`shadow[${index}].offsetX`}
                    value={shadowStyles.offsetX}
                    onChange={onChange}
                    min={-100}
                    max={100}
                />
            </label>
            <label className="full-width">
                Y offset
                <input
                    type="range"
                    name={`shadow[${index}].offsetY`}
                    value={shadowStyles.offsetY}
                    onChange={onChange}
                    min={-100}
                    max={100}
                />
            </label>
        </div>

        <div className="global-styles__control-row">
            <label className="full-width">
                Blur
                <input
                    type="range"
                    name={`shadow[${index}].blur`}
                    value={shadowStyles.blur}
                    onChange={onChange}
                    min={0}
                    max={100}
                />
            </label>
            <label className="full-width">
                Spread
                <input
                    type="range"
                    name={`shadow[${index}].spread`}
                    value={shadowStyles.spread}
                    onChange={onChange}
                    min={0}
                    max={100}
                />
            </label>
        </div>
    </div>
)
