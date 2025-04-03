import { FC, ReactElement } from 'react'

import { Styling } from '@app-compositions'
import { ConnectedTimeline, ConnectedVideoPicker, ConnectedVideoPlayer } from '@app-connectors'
import { useTypedSelector } from '@app-redux'

import './Editor.scss'

export interface EditorProps {
    className?: string
}

export const Editor: FC<EditorProps> = ({
    className = '',
}): ReactElement => {
    const { videoFile, videoMetadata } = useTypedSelector((state) => state.videoSlice)

    return (
        <div className={`editor ${className}`}>
            <div className="editor__section editor__video">
                {(
                    videoFile && videoMetadata
                        ? <ConnectedVideoPlayer />
                        : <ConnectedVideoPicker />
                )}
            </div>
            <div className="editor__section editor__styling">
                <Styling />
            </div>
            <div className="editor__section editor__timeline">
                <ConnectedTimeline />
            </div>
        </div>
    )
}
