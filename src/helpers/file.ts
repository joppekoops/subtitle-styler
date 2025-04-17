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