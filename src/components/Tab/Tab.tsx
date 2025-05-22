import { FC, ReactElement, ReactNode } from 'react'

import './Tab.scss'

export interface TabProps {
    name: string
    className?: string
    children?: ReactNode
}

export const Tab: FC<TabProps> = ({
    name,
    className = '',
    children,
}): ReactElement => (
    <div className={`tab ${className}`}>
        {children}
    </div>
)
