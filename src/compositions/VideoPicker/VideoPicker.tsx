import { FC, ReactElement } from 'react'

import { Icon } from '@app-components'
import { importFile } from '@app-helpers'

import './VideoPicker.scss'

export interface VideoPickerProps {
    onFileChanged: (file?: File | null) => void
    videoFile?: string | null
    className?: string
}

export const VideoPicker: FC<VideoPickerProps> = ({
    onFileChanged,
    videoFile,
    className = '',
}): ReactElement => {
    const browseVideos = async () => {
        try {
            const file = await importFile(
                [{
                    description: 'Video Files',
                    accept: { 'video/*': ['.mp4', '.mov', '.webm', '.ogg'] },
                }],
                'videos',
            )

            onFileChanged(file)
        } catch (error) {
            if (error instanceof DOMException) {
                switch (error.name) {
                    case 'AbortError':
                        return
                    default:
                        console.error(error)
                        return
                }
            } else {
                console.error(error)
            }
        }
    }

    const removeVideo = () => {
        onFileChanged(null)
    }

    return (
        <div className={`video-picker ${className}`}>
            <Icon name="videoFile" className="video-picker__icon" />
            <p>Select a video to start creating your captions</p>

            {
                videoFile
                    ? <div className="video-picker__preview">
                        <video className="video-picker__preview-video" src={videoFile} />
                        <button className="video-picker__delete-button button button--icon button--negative"
                                onClick={removeVideo}
                        >
                            <Icon name="cross" />
                        </button>
                    </div>
                    : <button
                        className="video-picker__button button"
                        onClick={browseVideos}
                    >
                        Choose Video…
                    </button>

            }
        </div>
    )
}
