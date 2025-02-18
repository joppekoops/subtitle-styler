import { VideoPicker } from '@app-compositions'
import { getFileMetadata } from '@app-helpers'
import { setVideoFile, setVideoMetadata, useTypedDispatch } from '@app-redux'
import { FC } from 'react'

export const ConnectedVideoPicker: FC = () => {
    const dispatch = useTypedDispatch()

    const processVideoFile = async (fileHandle: FileSystemFileHandle): Promise<void> => {
        const file = await fileHandle.getFile()
        const reader = new FileReader()

        reader.addEventListener('load', () => {
            dispatch(setVideoFile(reader.result))
        })
        reader.readAsDataURL(file)

        const metadata = await getFileMetadata(file)

        dispatch(setVideoMetadata(metadata))
    }

    return (
        <VideoPicker
            onFileChanged={(fileHandle) => processVideoFile(fileHandle)}
        />
    )
}
