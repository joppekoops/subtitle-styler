import { FC, ReactElement } from 'react'

import { icons } from './set'

import './Icon.scss'

export type IconName = keyof typeof icons

interface IconProps {
    name: IconName
    className?: string
}

export const Icon: FC<IconProps> = ({
    name,
    className = '',
}): ReactElement | null => {
    const IconComponent = icons[name]

    return IconComponent
        ? (<div className={`icon ${className}`}>
            <IconComponent />
        </div>)
        : null
}
