import { FC } from 'react'

import { VideoPicker } from '@app-compositions'
import { fileReadDataURL, getFileMetadata } from '@app-helpers'
import { setVideoFile, setVideoMetadata, useTypedDispatch, useTypedSelector } from '@app-redux'

export const ConnectedVideoPicker: FC = () => {
    const dispatch = useTypedDispatch()

    const { videoFile } = useTypedSelector(state => state.videoSlice)

    const processVideoFile = async (fileHandle: FileSystemFileHandle | null): Promise<void> => {
        if (! fileHandle) {
            dispatch(setVideoFile(null))
            dispatch(setVideoMetadata(null))
            return
        }

        const file = await fileHandle.getFile()

        const metadata = await getFileMetadata(file)
        const dataUrl = await fileReadDataURL(file)

        dispatch(setVideoFile(dataUrl))
        dispatch(setVideoMetadata(metadata))
    }

    return (
        <VideoPicker
            onFileChanged={(fileHandle) => processVideoFile(fileHandle)}
            videoFile={videoFile}
        />
    )
}
