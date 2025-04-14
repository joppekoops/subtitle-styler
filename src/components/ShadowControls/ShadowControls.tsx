import { FC, ReactElement } from 'react'

import { ShadowStyles } from '@app-entities'

import './ShadowControls.scss'
import { Icon } from '@app-components'

interface ShadowControlsProps {
    shadowStyles: ShadowStyles
    index: number
    onRemoveShadow: (index: number) => void
    className?: string
}

export const ShadowControls: FC<ShadowControlsProps> = ({
    shadowStyles,
    index,
    onRemoveShadow,
    className = '',
}): ReactElement => (
    <div className={`shadow-controls ${className}`}>
        <button type="button"
                className="button button--negative button--icon shadow-controls__remove-button"
                onClick={() => onRemoveShadow(index)}
        >
            <Icon name="x" />
        </button>

        <div className="global-styles__control-row">
            <label>
                Color
                <input type="color"
                       name={`shadow[${index}].color`}
                       defaultValue={shadowStyles.color}
                />
            </label>
        </div>

        <div className="global-styles__control-row">
            <label className="full-width">
                X offset
                <input type="range"
                       name={`shadow[${index}].offsetX`}
                       defaultValue={shadowStyles.offsetX}
                       min={-100}
                       max={100}
                />
            </label>
            <label className="full-width">
                Y offset
                <input type="range"
                       name={`shadow[${index}].offsetY`}
                       defaultValue={shadowStyles.offsetY}
                       min={-100}
                       max={100}
                />
            </label>
        </div>

        <div className="global-styles__control-row">
            <label className="full-width">
                Blur
                <input type="range"
                       name={`shadow[${index}].blur`}
                       defaultValue={shadowStyles.blur}
                       min={0}
                       max={100}
                />
            </label>
            <label className="full-width">
                Spread
                <input type="range"
                       name={`shadow[${index}].spread`}
                       defaultValue={shadowStyles.spread}
                       min={0}
                       max={100}
                />
            </label>
        </div>
    </div>
)
