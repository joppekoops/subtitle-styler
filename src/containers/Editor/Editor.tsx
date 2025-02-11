import { FC, ReactElement } from 'react'

import { Styling } from '@app-compositions'
import { ConnectedTimeline, ConnectedVideoPlayer } from '@app-connectors'

import './Editor.scss'

export interface EditorProps {
    className?: string
}

export const Editor: FC<EditorProps> = ({
    className = '',
}): ReactElement => (
    <div className={`editor ${className}`}>
        <div className="editor__section editor__section--video">
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
