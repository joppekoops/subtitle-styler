import { EditorContent, useEditor } from '@tiptap/react'
import { Mark } from '@tiptap/core'
import { Bold } from '@tiptap/extension-bold'
import { Document } from '@tiptap/extension-document'
import { Text } from '@tiptap/extension-text'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Italic } from '@tiptap/extension-italic'
import { Underline } from '@tiptap/extension-underline'
import { HardBreak } from '@tiptap/extension-hard-break'
import { FC, ReactElement, useEffect } from 'react'

import { Preset } from '@app-entities'

import { CueTextEditorMenu } from '@app-compositions'

import './CueTextEditor.scss'

const VttClass = Mark.create({
    name: 'vttClass',
    addOptions: () => ({ HTMLAttributes: { class: null } }),
    addAttributes: () => ({ class: { default: null } }),
    parseHTML: () => [{ tag: 'span[class]' }],
    priority: 999,
    renderHTML: ({ HTMLAttributes }) => ['span', HTMLAttributes, 0],
})

const extensions = [
    Document,
    Text,
    Paragraph.extend({ whitespace: 'pre', addAttributes: () => ({ class: { default: 'cue__text' } }) }),
    Bold.extend({ renderHTML: ({ HTMLAttributes }) => ['b', HTMLAttributes, 0] }),
    Italic.extend({ renderHTML: ({ HTMLAttributes }) => ['i', HTMLAttributes, 0] }),
    Underline,
    VttClass,
    HardBreak,
]

export interface CueTextEditorProps {
    cueText: string
    presets: Preset[]
    onChange: (html: string) => void
}

export const CueTextEditor: FC<CueTextEditorProps> = ({
    cueText,
    presets,
    onChange,
}): ReactElement => {

    const editor = useEditor({
        content: cueText,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            onChange(html)
        },
        extensions,
        parseOptions: { preserveWhitespace: 'full' },
        editorProps: {},
    })

    useEffect(() => {
        if (! editor) {
            return
        }

        const selection = editor.state.selection.ranges[0]

        editor.commands.setContent(cueText, false, { preserveWhitespace: 'full' })

        editor.commands.setTextSelection({ from: selection.$from.pos, to: selection.$to.pos })
    }, [cueText, editor])

    return (
        <>
            <EditorContent editor={editor} className="cue-text-editor__editor" />
            <CueTextEditorMenu editor={editor} presets={presets} />
        </>
    )
}