import { FC, ReactElement } from 'react'

import './Styling.scss'

export interface StylingProps {
    className?: string
}

export const Styling: FC<StylingProps> = ({
    className = '',
}): ReactElement => (
    <div className={`styling ${className}`}>
        styling
    </div>
)
