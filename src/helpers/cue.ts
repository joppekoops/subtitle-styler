import { CSSProperties } from 'react'

import { CuePosition, CueProperties, CueWithHtml } from '@app-entities'
import { isNumber } from '@app-helpers'

const getLineValue = (line: number, snapToLines: boolean): string =>
    snapToLines ? `${Math.abs(line)}rem` : `${Math.abs(line)}%` // TODO: Multiply by line-height when available

export const getCueTop = (line: LineAndPositionSetting, snapToLines: boolean): string =>
    (isNumber(line) && line >= 0)
        ? getLineValue(line, snapToLines)
        : 'auto'

export const getCueBottom = (line: LineAndPositionSetting, snapToLines: boolean): string => {
    if (isNumber(line) && line < 0) {
        return getLineValue(line, snapToLines)
    } else if (getCueTop(line, snapToLines) === 'auto') {
        return '20%'
    }

    return 'auto'
}

export const getCueLeft = (position: LineAndPositionSetting, align: AlignSetting): string =>
    isNumber(position) && (align === 'left' || align === 'start')
        ? `${position}%`
        : '0%'

export const getCueWidth = (position: LineAndPositionSetting, align: AlignSetting): string => {
    if (! isNumber(position)) {
        return '100%'
    } else if (align === 'end' || align === 'right') {
        return `${position}%`
    } else if (align === 'center') {
        return `${position * 2}%`
    }

    return '100%'
}

export const getCuePosition = (cueProperties: CueProperties): CuePosition => ({
    align: cueProperties.align,
    top: getCueTop(cueProperties.line, cueProperties.snapToLines),
    bottom: getCueBottom(cueProperties.line, cueProperties.snapToLines),
    left: getCueLeft(cueProperties.position, cueProperties.align),
    width: getCueWidth(cueProperties.position, cueProperties.align),
    size: cueProperties.size,
    duration: cueProperties.endTime - cueProperties.startTime,
})

export const getCueStyles = (cuePosition: CuePosition): CSSProperties => ({
    '--cue-align': cuePosition.align,
    '--cue-top': cuePosition.top,
    '--cue-bottom': cuePosition.bottom,
    '--cue-left': cuePosition.left,
    '--cue-width': cuePosition.width,
    '--cue-size': cuePosition.size,
    '--cue-duration': `${cuePosition.duration}s`,
} as CSSProperties)

const cueRenderElement = document.createElement('div')

export const getCueWithHtml = (cue: VTTCue): CueWithHtml => {
    cueRenderElement.replaceChildren(cue.getCueAsHTML())
    const html = cueRenderElement.innerHTML

    // Workaround to extend VTTCue with html property, because VTTCue is not extensible
    return new Proxy(cue, {
        get(target, prop) {
            if (prop === 'html') {
                return html
            }
            return target[prop as keyof VTTCue]
        },
    }) as CueWithHtml
}

export const htmlToVttContent = (html: string): string => {
    return html
        .replaceAll(/(?:<br>\w?\/?)|(?:<\/p.*?><p>)/g, '\n')
        .replaceAll(/<span class="([a-z|-]*?)">/g, '<c.$1>')
        .replaceAll(/<\/span>/g, '</c>')
        .replaceAll(/<\/?p.*?>/g, '')
}
