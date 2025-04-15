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
        updateCue(state, action) {
            const { cueIndex, updates } = action.payload
            const updatedCues = [...state.cues]
            const cue = updatedCues[cueIndex]

            if (cue) {
                Object.assign(cue, updates)
            }

            return {
                ...state,
                cues: updatedCues,
            }
        },
    },
})

export const {
    setCues,
    setActiveCueIndex,
    updateCue,
} = cueSlice.actions
