import { createSlice } from '@reduxjs/toolkit'

export interface CueState {
    cues: VTTCue[]
    activeCueIndex?: number
}

const initialState: CueState = {
    cues: [],
    activeCueIndex: undefined,
}

export const cueSlice = createSlice({
    name: 'cueSlice',
    initialState,
    reducers: {
        setCues(state, action) {
            return {
                ...state,
                cues: action.payload,
            }
        },
        setActiveCueIndex(state, action) {
            return {
                ...state,
                activeCueIndex: action.payload,
            }
        },
    },
})

export const {
    setCues,
    setActiveCueIndex,
} = cueSlice.actions
