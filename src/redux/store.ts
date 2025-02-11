import { Action, configureStore } from '@reduxjs/toolkit'
import { thunk, ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { slices, Slices } from './slices'

export type TypedDispatch = ThunkDispatch<Slices, unknown, Action>
export type SliceGetter = () => Slices
export const useTypedDispatch = (): TypedDispatch => useDispatch<TypedDispatch>()
export const useTypedSelector: TypedUseSelectorHook<Slices> = useSelector

export const store = configureStore({
    reducer: slices,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(thunk),
})
