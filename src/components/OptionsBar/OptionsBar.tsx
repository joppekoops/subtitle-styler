import { FC, ReactElement, ReactNode } from 'react'

import './OptionsBar.scss'

interface OptionsBarProps {
    label: string
    className?: string
    children: ReactNode
}

export const OptionsBar: FC<OptionsBarProps> = ({
    label,
    className,
    children,
}): ReactElement => (
    <fieldset role="radio-group" className={`options-bar ${className}`}>
        <legend>{label}</legend>
        <div className="options-bar__options">
            {children}
        </div>
    </fieldset>
)