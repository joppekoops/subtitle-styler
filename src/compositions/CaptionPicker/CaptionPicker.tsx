import { FC, ReactElement } from 'react'

import './CaptionsPicker.scss'

export interface CaptionPickerProps {
    onFileChanged: (fileHandle: FileSystemFileHandle | null) => void
    onCreateSubtitles: () => void
}

export const CaptionPicker: FC<CaptionPickerProps> = ({
    onFileChanged,
    onCreateSubtitles,
}): ReactElement => {
    const browseCaptionFiles = async () => {
        try {
            const [handle] = await window.showOpenFilePicker({
                types: [
                    {
                        description: 'Caption Files',
                        accept: {
                            'text/*': ['.srt', '.vtt'],
                        },
                    },
                ],
                excludeAcceptAllOption: true,
                multiple: false,
                startIn: 'videos',
            })

            onFileChanged(handle as unknown as FileSystemFileHandle)
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

    return (
        <div className="caption-picker">
            Do you want to create your subtitles here or import a subtitle file?
            <div className="caption-picker__container">
                <button className="button" onClick={onCreateSubtitles}>
                    Create Subtitles
                </button>
                <div>
                    <button className="button" onClick={browseCaptionFiles}>
                        Import Caption File...
                    </button>
                    <span className="caption-picker__allowed-extensions">*.srt, *.vtt</span>
                </div>
            </div>
        </div>
    )
}