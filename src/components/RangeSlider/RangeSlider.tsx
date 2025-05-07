import { ChangeEvent, CSSProperties, FC, ReactElement } from 'react'

import './RangeSlider.scss'

interface RangeSliderProps {
    label: string
    name: string
    min?: number
    max?: number
    markers?: number[]
    value?: number | string
    unit?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    className?: string
}

export const RangeSlider: FC<RangeSliderProps> = ({
    label,
    name,
    min = 0,
    max = 100,
    markers = [],
    value = 50,
    unit,
    onChange,
    className = '',
}): ReactElement => (
    <div
        className={`range-slider ${className}`}
        style={{
            '--range-min': min,
            '--range-max': max,
            '--range-value': value,
        } as CSSProperties}
    >
        <label htmlFor={`${name}Range`} className="range-slider__label">{label}</label>
        <div className="range-slider__slider-container">
            <input
                type="range"
                name={name}
                min={min}
                max={max}
                value={value}
                id={`${name}Range`}
                list={`${name}Datalist`}
                onChange={onChange}
                className="range-slider__input"
            />
            <span className="range-slider__min" aria-hidden>{min}{unit}</span>
            <span className="range-slider__max" aria-hidden>{max}{unit}</span>
            <output className="range-slider__value" aria-hidden>{value}{unit}</output>
        </div>
        <datalist id={`${name}Datalist`}>
            <option value={min} />
            {markers.map(marker => (<option value={marker} key={marker} />))}
            <option value={max} />
        </datalist>
    </div>
)