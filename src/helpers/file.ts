import MediaInfoFactory, { Media, MediaInfo } from 'mediainfo.js'

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