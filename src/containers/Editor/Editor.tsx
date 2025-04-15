import { FC, ReactElement } from 'react'

import { Styling, Import } from '@app-containers'
import { ConnectedTimeline, ConnectedVideoPlayer } from '@app-connectors'
import { useTypedSelector } from '@app-redux'

import './Editor.scss'

export interface EditorProps {
    className?: string
}

export const Editor: FC<EditorProps> = ({
    className = '',
}): ReactElement => {
    const { videoFile, subtitleFile } = useTypedSelector((state) => state.videoSlice)

    if (! videoFile || ! subtitleFile) {
        return <Import />
    } else {
        return (
            <div className={`editor ${className}`}>
                <div className="editor__section editor__video">
                    <ConnectedVideoPlayer />
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
}
