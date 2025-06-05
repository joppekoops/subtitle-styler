import { set } from 'lodash'

import { createSlice } from '@reduxjs/toolkit'
import { CaptionStyles, Preset } from '@app-entities'

import { defaultPresets } from './default-presets'

export interface StyleState {
    cueStyleElement: HTMLStyleElement
    globalStyles: CaptionStyles
    presets: Preset[]
    selectedPreset: Preset | null
}

const initialState: StyleState = {
    cueStyleElement: document.getElementById('cueStyleElement') as HTMLStyleElement,
    globalStyles: {
        fontFamily: 'sans-serif',
        fontVariant: '400',
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
    presets: defaultPresets,
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

            set(state.globalStyles, key, isNaN(parseFloat(value || 0)) ? value : parseFloat(value || 0))
        },
        addShadow(state, action) {
            const { color, offsetX, offsetY, blur } = action.payload

            state.globalStyles.shadow.push({
                color: color || '#000000',
                offsetX: offsetX || 0,
                offsetY: offsetY || 0,
                blur: blur || 0,
            })
        },
        removeShadow(state, action) {
            state.globalStyles.shadow.splice(action.payload, 1)
        },
        addPreset(state, action) {
            const preset = {
                name: action.payload,
                builtIn: false,
                styles: state.globalStyles,
            }

            state.presets.push(preset)
            state.selectedPreset = preset
        },
        addEmptyPreset(state, action) {
            const preset = {
                name: action.payload,
                builtIn: false,
                styles: initialState.globalStyles,
            }

            state.presets.push(preset)
            state.selectedPreset = preset
            state.globalStyles = preset.styles
        },
        removePreset(state, action) {
            state.presets.splice(action.payload, 1)
        },
        updatePreset(state, action) {
            state.presets[action.payload].styles = state.globalStyles
            state.selectedPreset = state.presets[action.payload]
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
        importPreset(state, action) {
            state.presets.push(action.payload)
        },
    },
})

export const {
    setGlobalStyles,
    updateGlobalStyles,
    addShadow,
    removeShadow,
    addPreset,
    addEmptyPreset,
    removePreset,
    updatePreset,
    renamePreset,
    selectPreset,
    importPreset,
} = styleSlice.actions
