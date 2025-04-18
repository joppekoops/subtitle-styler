import { FC, ReactElement, ReactNode } from 'react'

import './Tab.scss'

export interface TabProps {
    name: string
    children?: ReactNode
}

export const Tab: FC<TabProps> = ({
    name,
    children
}): ReactElement | null => (
    <div className={'tab'}>
        {children}
    </div>
)
