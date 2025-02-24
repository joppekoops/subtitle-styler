import { isNumber } from './type-guards'

export interface CuePosition {
    align?: AlignSetting,
    top: string,
    bottom: string,
    left: string,
    width: string,
    size?: number,
}

export interface CueProperties {
    align: AlignSetting
    line: LineAndPositionSetting
    snapToLines: boolean
    position: LineAndPositionSetting
    size?: number
}

const getLineValue = (line: number, snapToLines: boolean): string =>
    snapToLines ? `${Math.abs(line)}rem` : `${Math.abs(line)}%`; // TODO: Multiply by line-height when available

export const getCueTop = (line: LineAndPositionSetting, snapToLines: boolean): string =>
    isNumber(line)
        ? line >= 0
            ? getLineValue(line, snapToLines)
            : 'auto'
        : 'auto'

export const getCueBottom = (line: LineAndPositionSetting, snapToLines: boolean): string =>
    isNumber(line) && line < 0
        ? getLineValue(line, snapToLines)
        : getCueTop(line, snapToLines) === 'auto'
        ? '20%'
        : 'auto'

export const getCueLeft = (position: LineAndPositionSetting, align: AlignSetting) =>
    isNumber(position) && (align === 'left' || align === 'start')
        ? `${position}%`
        : '0%'

export const getCueWidth = (position: LineAndPositionSetting, align: AlignSetting) =>
    isNumber(position)
        ? align === 'right' || align === 'end'
            ? `${position}%`
            : align === 'center'
                ? `${position * 2}%`
                : '100%'
        : '100%'

export const getCuePosition = (cueProperties: CueProperties): CuePosition => ({
    align: cueProperties.align,
    top: getCueTop(cueProperties.line, cueProperties.snapToLines),
    bottom: getCueBottom(cueProperties.line, cueProperties.snapToLines),
    left: getCueLeft(cueProperties.position, cueProperties.align),
    width: getCueWidth(cueProperties.position, cueProperties.align),
    size: cueProperties.size,
})