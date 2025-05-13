import { createSlice } from '@reduxjs/toolkit'
import { Media } from 'mediainfo.js'

export interface VideoState {
    videoFile: string | null
    videoMetadata: Media | null
    subtitleFile: string | null
    currentTime: number
    timeSetter: number
    isPlaying: boolean
}

const initialState: VideoState = {
    videoFile: null,
    videoMetadata: null,
    subtitleFile: null,
    currentTime: 0,
    timeSetter: 0,
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
        setTimeSetter(state, action) {
            return {
                ...state,
                timeSetter: action.payload,
            }
        },
    },
})

export const {
    setVideoFile,
    setVideoMetadata,
    setSubtitleFile,
    setCurrentTime,
    setTimeSetter,
} = videoSlice.actions
