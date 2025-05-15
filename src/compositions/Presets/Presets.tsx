import { Item, Menu, useContextMenu } from 'react-contexify'
import { FC, ReactElement, useEffect, useRef, useState } from 'react'

import { Preset } from '@app-entities'
import { addSuffixIfNameExists, toKebabCase } from '@app-helpers'
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
    onImportPreset: () => void
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
    onImportPreset,
    className = '',
}): ReactElement => {
    const [isOpen, setIsOpen] = useState(false)

    const select = useRef<HTMLDivElement>(null)
    const { show } = useContextMenu()

    const handleRenamePreset = (preset: Preset, index: number) => {
        const name = prompt('Enter new preset name', preset.name)
        name && onRenamePreset(index, addSuffixIfNameExists(name, presets))
    }

    const handleCreatePreset = () => {
        const name = prompt('Enter preset name')
        name && onAddPreset(addSuffixIfNameExists(name, presets))
    }

    const handleSelectPreset = (preset: Preset | null) => {
        onSelectPreset(preset)
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
                        <div className="presets__buttons">
                            <button
                                type="button"
                                title="Save the current styles as a preset"
                                className="presets__add-button button button--primary"
                                onClick={handleCreatePreset}
                            >
                                <Icon name="add" />
                                Add Preset
                            </button>

                            <button
                                type="button"
                                title="Import a preset file"
                                className="presets__add-button button"
                                onClick={onImportPreset}
                            >
                                <Icon name="add" />
                                Import Preset
                            </button>
                        </div>

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
                                            <Item onClick={() => onUpdatePreset(index)}>
                                                Update with current styles
                                            </Item>
                                            <Item onClick={() => onExportPreset(preset)}>Export</Item>
                                            <Item onClick={() => onRemovePreset(index)}>Delete</Item>
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
