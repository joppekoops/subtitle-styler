import { FC, ReactElement } from 'react'
import { showOpenFilePicker } from 'show-open-file-picker'

import './VideoPicker.scss'

declare global {
    interface Window {
        showOpenFilePicker: typeof showOpenFilePicker
    }
}

if (! window.showOpenFilePicker) {
    window.showOpenFilePicker = showOpenFilePicker
}

export interface VideoPickerProps {
    onFileChanged: (fileHandle: FileSystemFileHandle) => void
    className?: string
}

export const VideoPicker: FC<VideoPickerProps> = ({
  onFileChanged,
  className = '',
}): ReactElement => {
    const browseVideos = async () => {
        try {
            const [handle] = await window.showOpenFilePicker({
                types: [
                    {
                        description: 'Video Files',
                        accept: {
                            'video/*': ['.mp4', '.mov', '.webm', '.ogg'],
                        },
                    },
                ],
                excludeAcceptAllOption: true,
                multiple: false,
                startIn: 'videos',
            })

            onFileChanged(handle as unknown as FileSystemFileHandle)
        } catch (error) {
            // TODO: handle file picker aborted by user
            console.error(error)
        }
    }

    return (
        <div className={`video-picker ${className}`}>
            <button
                className={'video-picker__button'}
                onClick={() => browseVideos()}
            >
                Choose Video…
            </button>
        </div>
    )
}
