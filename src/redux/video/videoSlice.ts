import { createSlice } from '@reduxjs/toolkit'
import { Media } from 'mediainfo.js'

export interface VideoState {
    videoFile: string | null
    videoMetadata: Media | null
    subtitleFile: string | null
    currentTime: number
    isPlaying: boolean
}

const initialState: VideoState = {
    videoFile: null,
    videoMetadata: null,
    subtitleFile: null,
    currentTime: 0,
    isPlaying: false,
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
        setVideoMetadata(state, action) {
            return {
                ...state,
                videoMetadata: action.payload,
            }
        },
        setSubtitleFile(state, action) {
            return {
                ...state,
                subtitleFile: action.payload,
            }
        },
        setCurrentTime(state, action) {
            return {
                ...state,
                currentTime: action.payload,
            }
        },
    },
})

export const {
    setVideoFile,
    setVideoMetadata,
    setSubtitleFile,
    setCurrentTime,
} = videoSlice.actions
