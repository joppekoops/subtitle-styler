import { set } from 'lodash'

import { createSlice } from '@reduxjs/toolkit'
import { CaptionStyles, Preset } from '@app-entities'

export interface StyleState {
    cueStyleElement: HTMLStyleElement
    globalStyles: CaptionStyles
    presets: Preset[]
    selectedPreset: Preset | null //TODO make Preset
}

const initialState: StyleState = {
    cueStyleElement: document.getElementById('cueStyleElement') as HTMLStyleElement,
    globalStyles: {
        fontFamily: 'sans-serif',
        fontVariant: '400',
        bold: false,
        italics: false,
        underline: false,
        fontSize: 16,
        alignment: 'center',
        fill: '#ffffff',
        stroke: {
            color: '#000000',
            width: 1,
        },
        position: {
            horizontal: 'auto',
            vertical: 80,
            useLines: false,
        },
        box: {
            color: '#000000',
            opacity: 255,
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
        },
        shadow: [
            {
                color: '#000000',
                offsetX: 0,
                offsetY: 0,
                blur: 0,
                spread: 0,
            },
        ],
        transition: {
            start: {
                preset: 'none',
                duration: 0,
                easing: 'linear',
            },
            end: {
                preset: 'none',
                duration: 0,
                easing: 'linear',
            },
        },
    },
    presets: [],
    selectedPreset: null,
}

export const styleSlice = createSlice({
    name: 'styleSlice',
    initialState,
    reducers: {
        setGlobalStyles(state, action) {
            return {
                ...state,
                globalStyles: action.payload,
            }
        },
        updateGlobalStyles(state, action) {
            const { key, value } = action.payload

            set(state.globalStyles, key, isNaN(parseInt(value)) ? value : parseInt(value))
        },
        addShadow(state, action) {
            const { color, offsetX, offsetY, blur, spread } = action.payload

            state.globalStyles.shadow.push({
                color: color || '#000000',
                offsetX: offsetX || 0,
                offsetY: offsetY || 0,
                blur: blur || 0,
                spread: spread || 0,
            })
        },
        removeShadow(state, action) {
            state.globalStyles.shadow.splice(action.payload, 1)
        },
        addPreset(state, action) {
            state.presets.push({
                name: action.payload,
                styles: state.globalStyles,
            })
        },
        removePreset(state, action) {
            state.presets.splice(action.payload, 1)
        },
        updatePreset(state, action) {
            state.presets[action.payload].styles = state.globalStyles
        },
        renamePreset(state, action) {
            const { index, name } = action.payload
            state.presets[index].name = name
        },
        selectPreset(state, action) {
            state.selectedPreset = action.payload

            if (action.payload === null) {
                return
            }

            state.globalStyles = action.payload.styles
        },
    },
})

export const {
    setGlobalStyles,
    updateGlobalStyles,
    addShadow,
    removeShadow,
    addPreset,
    removePreset,
    updatePreset,
    renamePreset,
    selectPreset,
} = styleSlice.actions
