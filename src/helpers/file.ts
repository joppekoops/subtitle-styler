import MediaInfoFactory, { Media, MediaInfo } from 'mediainfo.js'
import { showOpenFilePicker, showSaveFilePicker } from 'show-open-file-picker'
import { FilePickerAcceptType } from 'show-open-file-picker/types'

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