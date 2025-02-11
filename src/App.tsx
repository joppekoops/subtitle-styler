import { FC, ReactElement } from 'react'

import { Editor } from '@app-containers'
import { AppProviders } from '@app-providers'

export const App: FC = (): ReactElement => (
    <AppProviders>
        <Editor />
    </AppProviders>
)
