import { Item, Menu, useContextMenu } from 'react-contexify'
import { isEqual } from 'lodash'
import { FC, ReactElement, useRef, useState } from 'react'

import { CaptionStyles, Preset } from '@app-entities'
import { addSuffixIfNameExists, toKebabCase } from '@app-helpers'
import { useDialogDismiss, useTemporaryToggle } from '@app-hooks'
import { Icon } from '@app-components'

import './Presets.scss'

export interface PresetsProps {
    presets: Preset[]
    selectedPreset: Preset | null
    globalStyles: CaptionStyles
    onAddPreset: (name: string) => void
    onAddEmptyPreset: (name: string) => void
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
    globalStyles,
    onAddPreset,
    onAddEmptyPreset,
    onRemovePreset,
    onUpdatePreset,
    onRenamePreset,
    onSelectPreset,
    onExportPreset,
    onImportPreset,
    className = '',
}): ReactElement => {
    const [isOpen, setIsOpen] = useState(false)
    const [isSaved, triggerIsSaved] = useTemporaryToggle(1000)

    const select = useRef<HTMLDivElement>(null)
    const { show } = useContextMenu()

    const handleRenamePreset = (preset: Preset, index: number) => {
        const name = prompt('Enter new preset name', preset.name)
        name && onRenamePreset(index, addSuffixIfNameExists(name, presets))
    }

    const handleCreatePreset = () => {
        const name = prompt('Enter preset name')
        name && onAddPreset(addSuffixIfNameExists(name, presets))
        triggerIsSaved()
    }

    const handleCreateEmptyPreset = () => {
        const name = prompt('Enter preset name')
        name && onAddEmptyPreset(addSuffixIfNameExists(name, presets))
        triggerIsSaved()
    }

    const handleSavePreset = () => {
        selectedPreset && onUpdatePreset(presets.indexOf(selectedPreset))
        triggerIsSaved()
    }

    const handleSelectPreset = (preset: Preset | null) => {
        onSelectPreset(preset)
        setIsOpen(false)
    }

    useDialogDismiss(select, () => setIsOpen(false))

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
                                <span className={`presets__option-preview__text ${isSaved ? 'presets__option-preview__text__saving' : ''} cue__text`}>
                                    {selectedPreset.name}
                                </span>

                                {! selectedPreset.builtIn && ! isEqual(selectedPreset.styles, globalStyles) &&
                                    <span className="presets__unsaved-indicator" title="unsaved changes" />
                                }
                            </div>
                            :
                            <div className="presets__option-preview">
                                <span>None</span>
                            </div>
                        }
                    </div>

                    <span className={`presets__select-marker ${isOpen ? 'presets__select-marker--active' : ''}`} />
                </button>

                {isOpen &&
                    <div className="presets__select-popover">
                        <section className="presets__preset-section">
                            <h4>Built-in</h4>
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
                                    presets.map((preset, index) => (preset.builtIn &&
                                        <li
                                            key={index}
                                            className="presets__option"
                                        >
                                            <button
                                                className="presets__option-preview cue"
                                                onClick={() => handleSelectPreset(preset)}
                                            >
                                                <span className={`presets__option-preview__text cue__text ${toKebabCase(preset.name)}`}>
                                                    {preset.name}
                                                </span>
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        </section>

                        <section className="presets__preset-section">
                            <h4>Custom</h4>
                            <div className="presets__add-buttons">
                                <button
                                    type="button"
                                    className="button button--primary"
                                    onClick={handleCreateEmptyPreset}
                                >
                                    <Icon name="add" />
                                    Add Preset
                                </button>
                                <button type="button" className="button" onClick={onImportPreset}>
                                    Import Preset...
                                </button>
                            </div>

                            <ul className="presets__options">
                                {
                                    presets.map((preset, index) => (! preset.builtIn &&
                                        <li
                                            key={index}
                                            className="presets__option"
                                            onContextMenu={(event) => show({ id: `menu${index}`, event })}
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
                                                onClick={(event) => show({ id: `menu${index}`, event })}
                                            >
                                                <Icon name="more" className="presets__option-more-icon" />
                                            </button>

                                            <Menu id={`menu${index}`}>
                                                <Item onClick={() => handleRenamePreset(preset, index)}>Rename</Item>
                                                <Item onClick={() => onExportPreset(preset)}>Export</Item>
                                                <Item onClick={() => onRemovePreset(index)}>Delete</Item>
                                            </Menu>
                                        </li>
                                    ))
                                }
                            </ul>
                        </section>
                    </div>
                }
            </div>
            <div className="presets__save-buttons">
                <button
                    type="button"
                    className="button button--primary"
                    disabled={! selectedPreset || selectedPreset.builtIn || isEqual(selectedPreset.styles, globalStyles)}
                    onClick={handleSavePreset}
                >
                    Save
                </button>
                <button type="button" className="button" onClick={handleCreatePreset}>
                    Save as...
                </button>
            </div>
        </div>
    )
}
