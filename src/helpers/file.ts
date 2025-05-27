import MediaInfoFactory, { Media, MediaInfo } from 'mediainfo.js'
import { showOpenFilePicker, showSaveFilePicker } from 'show-open-file-picker'
import { FilePickerAcceptType } from 'show-open-file-picker/types'

import { CaptionStyles, Preset } from '@app-entities'
import { numberToTimeString, captionStylesToCss, toKebabCase } from '@app-helpers'

// Get metadata from file with MediaInfo
export const getFileMetadata = async (file: File): Promise<Media | undefined> => {
    const getSize = () => file.size
    const readChunk = (): Promise<Uint8Array> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                reader.result instanceof ArrayBuffer ? resolve(new Uint8Array(reader.result)) : reject()
            })
            reader.readAsArrayBuffer(file)
        })

    const mediainfo: MediaInfo = await new Promise((resolve) => MediaInfoFactory({
        format: 'object',
        locateFile: (path) => `./${path}`,
    }, resolve))

    const result = await mediainfo.analyzeData(getSize, readChunk)

    return result.media
}

export const fileReadDataURL = async (file: File): Promise<string> => {
    return new Promise((resolve => {
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            resolve(reader.result as string)
        })

        reader.readAsDataURL(file)
    }))
}

export const fileReadText = async (file: File): Promise<string> => {
    return new Promise((resolve => {
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            resolve(reader.result as string)
        })

        reader.readAsText(file)
    }))
}

export const srtFileToVttFile = async (file: File): Promise<File> => {
    return new Promise((resolve => {
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            const srtContent = reader.result as string
            const vttContent = ['WEBVTT\n\n', srtContent.replaceAll(/([0-9]+),([0-9]+)/gm, '$1.$2')].join('')

            resolve(new File([vttContent], file.name.replace(/\.srt$/, '.vtt')))
        })

        reader.readAsText(file)
    }))
}

export const dataToVtt = async (cues: VTTCue[], globalStyles: CaptionStyles, presets: Preset[]): Promise<string> => {
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

    return `${header}\n\nSTYLE\n${globalCSS}\n${presetsCSS}\n\n${cuesVtt}`
}

export const exportAsFile = async (contents: BlobPart, filename: string, types: FilePickerAcceptType[]): Promise<void> => {
    if ('showSaveFilePicker' in window) {
        const handle = await showSaveFilePicker({
            suggestedName: filename,
            types,
        }) as unknown as FileSystemFileHandle

        const writable = await handle.createWritable()
        await writable.write(contents)
        await writable.close()
    } else {
        const file = new File([contents], filename, { type: Object.keys(types[0].accept)[0] })
        const url = URL.createObjectURL(file)
        const downloadLink = document.createElement('a')
        downloadLink.href = url
        downloadLink.download = filename
        downloadLink.click()
        URL.revokeObjectURL(url)
    }
}

export const importFile = async (types: FilePickerAcceptType[], startIn?: string): Promise<File | undefined> => {
    const [handle] = await showOpenFilePicker({
        types,
        excludeAcceptAllOption: true,
        multiple: false,
        startIn,
    })

    return handle.getFile()
}