import { Editor } from '@tiptap/react'
import { FC, ReactElement } from 'react'

import { Icon, ToggleButton } from '@app-components'
import { Preset } from '@app-entities'
import { toKebabCase } from '@app-helpers'

import './CueTextEditorMenu.scss'

export interface CueTextEditorMenuProps {
    editor: Editor | null
    presets: Preset[]
    className?: string
}

export const CueTextEditorMenu: FC<CueTextEditorMenuProps> = ({
    editor,
    presets,
    className = '',
}): ReactElement | undefined => {
    if (! editor) {
        return
    }

    return (
        <div className={`cue-text-editor-menu ${className}`}>
            <ToggleButton
                name="bold"
                value="bold"
                type="checkbox"
                checked={editor.isActive('bold')}
                onChange={() => editor.chain().focus().toggleBold().run()}
            >
                <Icon name="bold" />
            </ToggleButton>
            <ToggleButton
                name="italics"
                value="italics"
                type="checkbox"
                checked={editor.isActive('italic')}
                onChange={() => editor.chain().focus().toggleItalic().run()}
            >
                <Icon name="italics" />
            </ToggleButton>
            <ToggleButton
                name="underline"
                value="underline"
                type="checkbox"
                checked={editor.isActive('underline')}
                onChange={() => editor.chain().focus().toggleUnderline().run()}
            >
                <Icon name="underline" />
            </ToggleButton>
            <select
                value={editor.isActive('vttClass') ? editor.getAttributes('vttClass').class : ''}
                onChange={(event) => {
                    const value = event.target.value

                    if (! value) {
                        editor.chain().focus().unsetMark('vttClass').run()
                    } else {
                        editor.chain().focus().setMark('vttClass', { class: value }).run()
                    }
                }}
                className="full-width"
            >
                <option value="">None</option>
                {
                    presets.map(preset => {
                        return (
                            <option value={toKebabCase(preset.name)}
                                    key={toKebabCase(preset.name)}
                            >{preset.name}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}