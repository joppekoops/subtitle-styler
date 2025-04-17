import { FC, ReactElement } from 'react'

import { Editor } from '@app-containers'
import { AppProviders } from '@app-providers'

export const App: FC = (): ReactElement => {

    return (
        <AppProviders>
            <Editor />
        </AppProviders>
    )
}
