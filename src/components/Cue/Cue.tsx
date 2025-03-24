import { FC, ReactElement, ReactNode } from 'react'

import { getCuePosition, getCueStyles } from '@app-helpers'
import { CueProperties } from '@app-entities'

import './Cue.scss'

export interface CueProps {
    cueProperties: CueProperties
    children: ReactNode
    className?: string
}

export const Cue: FC<CueProps> = ({
    cueProperties,
    children,
    className = '',
}): ReactElement => {
    const cuePosition = getCuePosition(cueProperties)
    return (
        <div
            className={`cue ${className}`}
            style={getCueStyles(cuePosition)}
        >
            <span className="cue__text">
                { children }
            </span>
        </div>
    )
}
