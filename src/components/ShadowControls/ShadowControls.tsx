import { ChangeEvent, FC, ReactElement } from 'react'

import { ShadowStyles } from '@app-entities'
import { Icon, RangeSlider } from '@app-components'

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
            <RangeSlider
                label="X offset"
                name={`shadow[${index}].offsetX`}
                min={-100}
                max={100}
                markers={[0]}
                value={shadowStyles.offsetX}
                unit="px"
                onChange={onChange}
                className="full-width"
            />
            <RangeSlider
                label="Y offset"
                name={`shadow[${index}].offsetY`}
                min={-100}
                max={100}
                markers={[0]}
                value={shadowStyles.offsetY}
                unit="px"
                onChange={onChange}
                className="full-width"
            />
        </div>

        <div className="global-styles__control-row">
            <RangeSlider
                label="Blur"
                name={`shadow[${index}].blur`}
                min={0}
                max={100}
                unit="px"
                value={shadowStyles.blur}
                onChange={onChange}
                className="full-width"
            />
        </div>
    </div>
)
