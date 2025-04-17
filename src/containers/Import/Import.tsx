import { FC, ReactElement } from 'react'

import { ConnectedCaptionPicker, ConnectedVideoPicker } from '@app-connectors'
import { useTypedSelector } from '@app-redux'

import './Import.scss'
import { CaptionPicker } from '@app-compositions'

export interface ImportProps {

}

export const Import: FC<ImportProps> = ({}): ReactElement => {

    const { videoFile } = useTypedSelector(state => state.videoSlice)

    return (
        <div className="import">
            <header>
                <div className="import__wrapper">
                    <h1>Caption Styler</h1>
                    <p>Create stylish subtitles for videos on your website using fonts, color, animations and more.
                        Export options include the web standard webVTT format and our extension that can be used with
                        our video player element or <a href="#">supported third party video players.</a></p>

                    <a href="#">More Info</a>
                </div>
            </header>

            <main>
                <ConnectedVideoPicker />

                {
                    (! videoFile)
                        ?
                        <div className="import__wrapper">
                            <p>All imported video and caption files will stay on your computer and don't get uploaded to
                                our server.</p>
                        </div>
                        : <ConnectedCaptionPicker />
                }
            </main>
        </div>
    )
}