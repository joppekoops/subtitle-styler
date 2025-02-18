import { setVideoFile, setVideoMetaData, useTypedDispatch } from '@app-redux'
import { FC } from 'react'
import MediaInfoFactory, { MediaInfo } from 'mediainfo.js'

import { VideoPicker } from '@app-compositions'

export const ConnectedVideoPicker: FC = () => {
    const dispatch = useTypedDispatch()

    const processVideoFile = async (fileHandle: FileSystemFileHandle): Promise<void> => {

        const file = await fileHandle.getFile()

        const reader = new FileReader()
        reader.addEventListener('load', () => {
            dispatch(setVideoFile(reader.result))
        })
        reader.readAsDataURL(file)

        // Use mediainfo.js for getting metadata of video
        const getSize = () => file.size;
        const readChunk = (): Promise<Uint8Array> =>
            new Promise((resolve, reject) => {
                reader.addEventListener('load', () => {
                    reader.result instanceof ArrayBuffer ? resolve(new Uint8Array(reader.result)) : reject()
                })
                reader.readAsArrayBuffer(file)
            })

        const mediainfo: MediaInfo = await new Promise((resolve) => MediaInfoFactory({ format: 'object' }, resolve))
        const result = await mediainfo.analyzeData(getSize, readChunk)

        dispatch(setVideoMetaData(result.media))
    }

    return (
        <VideoPicker
            onInput={(fileHandle) => processVideoFile(fileHandle)}
        />
    )
}
