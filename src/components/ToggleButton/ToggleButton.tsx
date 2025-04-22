import { ChangeEvent, FC, ReactElement, ReactNode } from 'react'

import './ToggleButton.scss'

interface ToggleButtonProps {
    type?: 'checkbox' | 'radio'
    name: string
    value: string
    defaultChecked?: boolean
    checked?: boolean
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    className?: string
    children: ReactNode
}

export const ToggleButton: FC<ToggleButtonProps> = ({
    type = 'checkbox',
    name,
    value,
    defaultChecked,
    checked,
    onChange,
    className = '',
    children,
}): ReactElement => (
    <label className={`toggle-button ${className}`}>
        <input
            type={type}
            name={name}
            value={value}
            defaultChecked={defaultChecked}
            checked={checked}
            onChange={onChange}
            className="toggle-button__input"
        />
        {children}
    </label>
)