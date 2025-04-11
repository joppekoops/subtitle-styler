import { FC, ReactElement, ReactNode } from 'react'

import './ToggleButton.scss'

interface ToggleButtonProps {
    type?: 'checkbox' | 'radio'
    name: string
    value: string
    defaultChecked?: boolean
    className?: string
    children: ReactNode
}

export const ToggleButton: FC<ToggleButtonProps> = ({
    type = 'checkbox',
    name,
    value,
    defaultChecked,
    className,
    children,
}): ReactElement => (
    <label className={`toggle-button ${className}`}>
        <input type={type} name={name} value={value} defaultChecked={defaultChecked} />
        {children}
    </label>
)