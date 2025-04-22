import { FC } from 'react'

import { setSubtitleFile, useTypedDispatch } from '@app-redux'
import { CaptionPicker } from '@app-compositions'
import { fileReadDataURL, srtFileToVttFile } from '@app-helpers'

export const ConnectedCaptionPicker: FC = () => {
    const dispatch = useTypedDispatch()

    const handleFileChanged = async (fileHandle: FileSystemFileHandle | null): Promise<void> => {
        if (! fileHandle) {
            dispatch(setSubtitleFile(null))
            return
        }

        let file = await fileHandle.getFile()

        if (file.name.endsWith('.srt')) {
            file = await srtFileToVttFile(file)
        }

        const dataUrl = await fileReadDataURL(file)

        dispatch(setSubtitleFile(dataUrl))
    }

    const handleCreateSubtitles = (): void => {
        alert('This feature is not implemented yet.')
    }

    return (
        <CaptionPicker
            onFileChanged={handleFileChanged}
            onCreateSubtitles={handleCreateSubtitles}
        />
    )
}
