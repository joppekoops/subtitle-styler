import { FC, ReactElement } from 'react'

import './VideoPicker.scss'

export interface VideoPickerProps {
    onInput: (fileHandle: FileSystemFileHandle) => void
    className?: string
}

export const VideoPicker: FC<VideoPickerProps> = ({
    onInput,
    className = '',
}): ReactElement => {

    const browseVideos = async () => {
        try {
            const [handle] = await window.showOpenFilePicker({
                types: [
                    {
                        description: "Video's",
                        accept: {
                            "video/*": [".mp4"],
                        },
                    },
                ],
                excludeAcceptAllOption: true,
                multiple: false,
            })

            onInput(handle)
        } catch (error) {
            // TODO: handle file picker aborted by user
            console.error(error)
        }
    }

    return(
        <div className={`video-picker ${className}`}>
            <button
                className={'video-picker__button'}
                onClick={() => browseVideos()}
            >Browse videos</button>
        </div>
    )
}
