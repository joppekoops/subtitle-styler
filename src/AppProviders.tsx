import { FC, PropsWithChildren, ReactElement } from 'react'
import { Provider as StoreProvider } from 'react-redux'

import { store } from '@app-redux'

export const AppProviders: FC<PropsWithChildren> = ({
    children,
}): ReactElement => (
    <StoreProvider store={store}>
        {children}
    </StoreProvider>
)
