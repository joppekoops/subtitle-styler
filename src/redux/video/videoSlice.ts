import { createSlice } from '@reduxjs/toolkit'

export interface VideoState {
    videoFile: string | null // TODO: Change to support File?
    subtitleFile: string | null // TODO: Change to support File?
}

const initialState: VideoState = {
    videoFile: '/res/test.mp4', // TODO: Make null initially and handle file browse?
    subtitleFile: '/res/test-en.vtt', // TODO: Make null initially and handle file browse?
}

export const videoSlice = createSlice({
    name: 'videoSlice',
    initialState,
    reducers: {
        setVideoFile(state, action) {
            return {
                ...state,
                videoFile: action.payload,
            }
        },
        setSubtitleFile(state, action) {
            return {
                ...state,
                subtitleFile: action.payload,
            }
        },
    },
})

export const {
    setVideoFile,
    setSubtitleFile,
} = videoSlice.actions
