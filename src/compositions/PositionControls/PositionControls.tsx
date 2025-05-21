import { ChangeEvent, FC, ReactElement } from 'react'

import { RangeSlider } from '@app-components'
import { PositionStyles } from '@app-entities'

import './PositionControls.scss'

export interface PositionControlsProps {
    position: PositionStyles
    onInput: (event: ChangeEvent<HTMLInputElement>) => void
    className?: string
}

export const PositionControls: FC<PositionControlsProps> = ({
    position,
    onInput,
    className = '',
}): ReactElement => (
    <section className={`position-controls ${className}`}>
        <h3>Position</h3>

        <div className="control-row">
            <RangeSlider
                label="Horizontal"
                name="position.horizontal"
                min={0}
                max={100}
                markers={[50]}
                value={position.horizontal}
                unit="%"
                onChange={onInput}
                className="full-width"
            />
        </div>

        <div className="control-row">
            {
                position.useLines
                    ? <label>
                        Vertical
                        <input
                            type="number"
                            name="position.vertical"
                            value={position.vertical}
                            onChange={onInput}
                        />
                    </label>
                    : <RangeSlider
                        label="Vertical"
                        name="position.vertical"
                        min={0}
                        max={100}
                        markers={[50, 80]}
                        value={position.vertical}
                        unit="%"
                        onChange={onInput}
                        className="full-width"
                    />
            }
        </div>

        <div className="control-row">
            <label>
                <input
                    type="checkbox"
                    name="position.useLines"
                    checked={position.useLines}
                    onChange={onInput}
                />
                Use Lines
            </label>
        </div>
    </section>
)