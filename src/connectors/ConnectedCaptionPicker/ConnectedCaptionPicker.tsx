import { FC } from 'react'

import { setSubtitleFile, useTypedDispatch } from '@app-redux'
import { CaptionPicker } from '@app-compositions'
import { fileReadDataURL, srtFileToVttFile } from '@app-helpers'

export const ConnectedCaptionPicker: FC = () => {
    const dispatch = useTypedDispatch()

    const handleFileChanged = async (file?: File | null): Promise<void> => {
        if (! file) {
            dispatch(setSubtitleFile(null))
            return
        }

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
