import { CSSProperties, FC, ReactElement, ReactNode } from 'react'

import { isNumber } from '@app-helpers'

import './Cue.scss'

export interface CueProps {
    align?: AlignSetting
    line?: LineAndPositionSetting
    snapToLines?: boolean
    position?: LineAndPositionSetting
    size?: number
    children: ReactNode
    className?: string
}

export const Cue: FC<CueProps> = ({
    align = 'center',
    line = 'auto',
    snapToLines = true,
    position = 'auto',
    size = 100,
    children,
    className = '',
}): ReactElement => {
    const getLineValue = (line: number, snapToLines: boolean) =>
        snapToLines ? `${Math.abs(line)}rem` : `${Math.abs(line)}%`; // TODO: Multiply by line-height when available

    const top = isNumber(line)
        ? line >= 0
            ? getLineValue(line, snapToLines)
            : 'auto'
        : 'auto'

    const bottom = isNumber(line) && line < 0
        ? getLineValue(line, snapToLines)
        : top === 'auto'
            ? '20%'
            : 'auto'

    const left = isNumber(position) && (align === 'left' || align === 'start')
        ? `${position}%`
        : '0%'

    const width = isNumber(position)
        ? align === 'right' || align === 'end'
            ? `${position}%`
            : align === 'center'
                ? `${position * 2}%`
                : '100%'
        : '100%'

    return (
        <div
            className={`cue ${className}`}
            style={{
                '--cue-align': align,
                '--cue-top': top,
                '--cue-bottom': bottom,
                '--cue-left': left,
                '--cue-width': width,
                '--cue-size': size,
        } as CSSProperties}>
            <span className="cue__text">
                { children }
            </span>
        </div>
    )
}
