import { Item, Menu, useContextMenu } from 'react-contexify'
import { FC, ReactElement, useEffect, useRef, useState } from 'react'

import { Preset } from '@app-entities'
import { toKebabCase } from '@app-helpers'
import { Icon } from '@app-components'

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
    const { show } = useContextMenu()

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
    }

    const handleExportPreset = (preset: Preset) => {
        onExportPreset(preset)
    }

    const handleRemovePreset = (index: number) => {
        onRemovePreset(index)
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
                                <span className="presets__option-preview__text cue__text">{selectedPreset.name}</span>
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
                    <div className="presets__select-popover">
                        <button
                            type="button"
                            title="Save the current styles as a preset"
                            className="presets__add-button button button--primary"
                            onClick={handleCreatePreset}
                        >
                            <Icon name="add" />
                            Add Preset
                        </button>

                        <ul className="presets__options">
                            <li className="presets__option">
                                <button
                                    className="presets__option-preview"
                                    onClick={() => handleSelectPreset(null)}
                                >
                                    <span>None</span>
                                </button>
                            </li>
                            {
                                presets.map((preset, index) => (
                                    <li
                                        key={index}
                                        className="presets__option"
                                        onContextMenu={(event) => show({ id: `menu${index}`, event: event })}
                                    >
                                        <button
                                            className="presets__option-preview cue"
                                            onClick={() => handleSelectPreset(preset)}
                                        >
                                            <span className={`presets__option-preview__text cue__text ${toKebabCase(preset.name)}`}>
                                                {preset.name}
                                            </span>
                                        </button>
                                        <button
                                            className="presets__option-more-button"
                                            onClick={(event) => show({ id: `menu${index}`, event: event })}
                                        >
                                            <Icon name="more" className="presets__option-more-icon" />
                                        </button>

                                        <Menu id={`menu${index}`}>
                                            <Item onClick={() => handleRenamePreset(preset, index)}>Rename</Item>
                                            <Item onClick={() => handleUpdatePreset(index)}>
                                                Update with current styles
                                            </Item>
                                            <Item onClick={() => handleExportPreset(preset)}>Export</Item>
                                            <Item onClick={() => handleRemovePreset(index)}>Delete</Item>
                                        </Menu>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}
