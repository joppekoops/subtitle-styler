import { FC } from 'react'

import { Export } from '@app-compositions'
import { useTypedSelector } from '@app-redux'
import { captionStylesToCss, exportAsFile, numberToTimeString, toKebabCase } from '@app-helpers'

export const ConnectedExport: FC = () => {
    const { globalStyles, presets } = useTypedSelector(state => state.styleSlice)
    const { cues } = useTypedSelector(state => state.cueSlice)

    const handleExport = async (filename: string) => {
        const header = 'WEBVTT'

        const cuesVtt = cues.map(cue => {
            const vertical = cue.vertical ? `vertical:${cue.vertical}` : ''
            const line = (cue.line !== 'auto') ? `line:${cue.line}${! cue.snapToLines ? '%' : ''}` : ''
            const position = (cue.position !== 'auto') ? `position:${cue.position}%` : ''
            const size = (cue.size !== 100) ? `size:${cue.size} ` : ''
            const align = (cue.align !== 'center') ? `align:${cue.align}` : ''

            const options = [vertical, line, position, size, align].filter(value => !! value).join(' ')

            return `${cue.id}\n${numberToTimeString(cue.startTime)} --> ${numberToTimeString(cue.endTime)} ${options}\n${cue.text}`.trim()
        }).join('\n\n').trim()

        const globalCSS = captionStylesToCss(globalStyles, '::cue')

        const presetsCSS = presets
            .filter(preset => cuesVtt.includes(`<c.${toKebabCase(preset.name)}>`))
            .map(preset => captionStylesToCss(preset.styles, `::cue(.${toKebabCase(preset.name)})`)).join('\n')

        const vtt = `${header}\n\nSTYLE\n${globalCSS}\n${presetsCSS}\n\n${cuesVtt}`

        try {
            await exportAsFile(vtt, filename, [{ accept: { 'text/vtt': ['.vtt'] } }])
        } catch (error) {
            if (error instanceof DOMException) {
                switch (error.name) {
                    case 'AbortError':
                        return
                    default:
                        console.error(error)
                        return
                }
            } else {
                console.error(error)
            }
        }
    }

    return (
        <Export onExport={handleExport} />
    )
}