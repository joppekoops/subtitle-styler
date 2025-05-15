import { createSlice } from '@reduxjs/toolkit'

export interface CueState {
    cues: VTTCue[]
    activeCueIndex?: number
    selectedCueIndex?: number
}

const initialState: CueState = {
    cues: [],
    activeCueIndex: undefined,
    selectedCueIndex: undefined,
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
        setSelectedCueIndex(state, action) {
            return {
                ...state,
                selectedCueIndex: action.payload,
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
    setSelectedCueIndex,
    updateCue,
} = cueSlice.actions
