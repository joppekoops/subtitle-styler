import { ChangeEvent, FC } from 'react'

import { GlobalStyles } from '@app-compositions'
import { addShadow, removeShadow, updateGlobalStyles, useTypedDispatch, useTypedSelector } from '@app-redux'

export const ConnectedGlobalStyles: FC = () => {
    const { globalStyles } = useTypedSelector((state) => state.styleSlice)

    const dispatch = useTypedDispatch()

    const handleInput = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        dispatch(updateGlobalStyles({
            key: event.target.name,
            value: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
        }))
    }

    const handleAddShadow = () => {
        dispatch(addShadow({}))
    }

    const handleRemoveShadow = (index: number) => {
        dispatch(removeShadow(index))
    }

    return (
        <GlobalStyles globalStyles={globalStyles}
                      onInput={handleInput}
                      onAddShadow={handleAddShadow}
                      onRemoveShadow={handleRemoveShadow}
        />
    )
}
