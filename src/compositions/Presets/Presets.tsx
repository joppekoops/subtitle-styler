import { FC, ReactElement, useEffect, useRef, useState } from 'react'

import { Preset } from '@app-entities'
import { toKebabCase } from '@app-helpers'

import './Presets.scss'

export interface PresetsProps {
    presets: Preset[]
    selectedPreset: Preset | null
    onAddPreset: (name: string) => void
    onRemovePreset: (index: number) => void
    onUpdatePreset: (index: number) => void
    onRenamePreset: (index: number, name: string) => void
    onSelectPreset: (preset: Preset | null) => void
    onExportPreset: (preset: Preset) => void
    className?: string
}

export const Presets: FC<PresetsProps> = ({
    presets,
    selectedPreset,
    onAddPreset,
    onRemovePreset,
    onUpdatePreset,
    onRenamePreset,
    onSelectPreset,
    onExportPreset,
    className = '',
}): ReactElement => {
    const [isOpen, setIsOpen] = useState(false)

    const select = useRef<HTMLDivElement>(null)

    const handleRenamePreset = (preset: Preset, index: number) => {
        const name = prompt('Enter new preset name', preset.name) || preset.name
        onRenamePreset(index, name)
    }

    const handleCreatePreset = () => {
        const name = prompt('Enter preset name') || 'New Preset'
        onAddPreset(name)
    }

    const handleSelectPreset = (preset: Preset | null) => {
        onSelectPreset(preset)
        setIsOpen(false)
    }

    const handleUpdatePreset = (index: number) => {
        onUpdatePreset(index)
        setIsOpen(false)
    }

    const handleExportPreset = (preset: Preset) => {
        onExportPreset(preset)
        setIsOpen(false)
    }

    const handleKeyboardEvent = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsOpen(false)
        }
    }

    const handleMouseEvent = (event: MouseEvent) => {
        if (select.current && event.target instanceof Element) {
            if (! select.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', handleKeyboardEvent)
        window.addEventListener('mouseup', handleMouseEvent)

        return () => {
            window.removeEventListener('keyup', handleKeyboardEvent)
            window.removeEventListener('mouseup', handleMouseEvent)
        }
    }, [])

    return (
        <div className={`presets ${className}`}>
            <button type="button" className="presets__add-button button" onClick={handleCreatePreset}>
                Add Preset
            </button>
            <div className={`presets__select ${isOpen ? 'presets__select--active' : ''}`} ref={select}>

                <button
                    className="presets__select-button"
                    onClick={() => setIsOpen(! isOpen)}
                    type="button"
                >
                    <div className="presets__selected-option">
                        {selectedPreset
                            ?
                            <div className={`presets__option-preview cue ${toKebabCase(selectedPreset.name)}`}>
                                <span className="cue__text">{selectedPreset.name}</span>
                            </div>
                            :
                            <div className="presets__option-preview">
                                <span className="">None</span>
                            </div>
                        }
                    </div>

                    <span className={`presets__select-marker ${isOpen ? 'presets__select-marker--active' : ''}`} />
                </button>

                {isOpen &&
                    <div className="presets__options">
                        <div className="presets__option">
                            <button
                                className="presets__option-preview"
                                onClick={() => handleSelectPreset(null)}
                            >
                                <span>None</span>
                            </button>
                        </div>
                        {
                            presets.map((preset, index) => (
                                <div key={index} className="presets__option">
                                    <button
                                        className="presets__option-preview cue"
                                        onClick={() => handleSelectPreset(preset)}
                                    >
                                        <span className={`presets__option-preview-cue__text cue__text ${toKebabCase(preset.name)}`}>
                                            {preset.name}
                                        </span>
                                    </button>
                                    <button
                                        type="button"
                                        className="button"
                                        onClick={() => handleRenamePreset(preset, index)}
                                    >
                                        Rename
                                    </button>
                                    <button
                                        type="button"
                                        className="button"
                                        onClick={() => handleUpdatePreset(index)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        type="button"
                                        className="button"
                                        onClick={() => handleExportPreset(preset)}
                                    >
                                        Export
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                }

            </div>
        </div>
    )
}
