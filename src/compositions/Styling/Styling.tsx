import { FC, ReactElement, useEffect } from 'react'
import { WebVTTParser } from 'webvtt-parser'

import { getPresetFromStyles, Preset } from '@app-helpers'
import vttData from '@app-resources/test-en.vtt?raw'

import './Styling.scss'
import { PresetItem } from '../PresetItem/PresetItem'

export interface StylingProps {
    className?: string
}

const parser = new WebVTTParser()

export const Styling: FC<StylingProps> = ({
    className = '',
}): ReactElement => {
    const parsedVttData = parser.parse(vttData)
    const presets = parsedVttData.styles.map((style) => getPresetFromStyles(style))

    let styleElement = document.querySelector<HTMLStyleElement>('style[data-ref="cue-styles"]')

    const applyStyles = () => {
        if (! styleElement) {
            styleElement = document.createElement('style')
            styleElement.setAttribute('data-ref', 'cue-styles')
            document.head.appendChild(styleElement)
        }

        // Add new styles to DOM
        styleElement.innerHTML = ''
        presets.forEach((preset) => styleElement?.appendChild(document.createTextNode(preset.styles)))
    }

    const handlePresetSave = (index: number, preset: Preset) => {
        presets[index] = preset
        applyStyles()
    }

    applyStyles()

    return (
        <div className={`styling ${className}`}>
            styling

            <div className="styling__presets">
                {presets.map((preset, i) => (
                    <PresetItem
                        key={preset.name}
                        preset={preset}
                        onSave={(updatedPreset) => handlePresetSave(i, updatedPreset)}
                        className="styling__preset"
                    />
                ))}
            </div>
        </div>
    )
}
