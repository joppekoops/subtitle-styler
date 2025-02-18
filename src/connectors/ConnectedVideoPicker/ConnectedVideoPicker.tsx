import { setVideoFile, useTypedDispatch } from '@app-redux'
import { FC } from 'react'

import { VideoPicker } from '@app-compositions'

export const ConnectedVideoPicker: FC = () => {
    const dispatch = useTypedDispatch()

    const processVideoFile = async (fileHandle: FileSystemFileHandle): Promise<void> => {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
            dispatch(setVideoFile(reader.result))
        })
        reader.readAsDataURL(await fileHandle.getFile())
    }

    return (
        <VideoPicker
            onInput={(fileHandle) => processVideoFile(fileHandle)}
        />
    )
}
