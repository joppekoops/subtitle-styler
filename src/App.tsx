import { FC, ReactElement } from 'react'

import { VideoPlayer } from '@app-compositions'

export const App: FC = (): ReactElement => (
    <VideoPlayer
        src={'/res/test.mp4'}
        subtitleSrc={'/res/test-en.vtt'}
    />
)
