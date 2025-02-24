import { CSSProperties, FC, ReactElement, ReactNode } from 'react'

import { CueProperties, getCuePosition } from '@app-helpers'

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
    const { align, top, bottom, left, width, size } = getCuePosition(cueProperties)

    const cueStyles: CSSProperties = {
        '--cue-align': align,
        '--cue-top': top,
        '--cue-bottom': bottom,
        '--cue-left': left,
        '--cue-width': width,
        '--cue-size': size,
    } as CSSProperties

    return (
        <div
            className={`cue ${className}`}
            style={cueStyles}
        >
            <span className="cue__text">
                { children }
            </span>
        </div>
    )
}
