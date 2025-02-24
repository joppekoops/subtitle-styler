import { FC, FormEvent, ReactElement, useState } from 'react'
import { Preset } from '@app-helpers'

export interface PresetItemProps {
    preset: Preset
    onSave: (preset: Preset) => void
    className?: string
}

export const PresetItem: FC<PresetItemProps> = ({
    preset,
    onSave,
    className = '',
}): ReactElement => {
    const [name, setName] = useState(preset.name)
    const [styles, setStyles] = useState(preset.styles)

    const handleSave = (e: FormEvent) => {
        e.preventDefault()
        onSave({ name, styles })
    }

    return (
        <form className={`preset-item ${className}`}>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="preset-item__name"
            />
            <textarea
                value={styles}
                onChange={(e) => setStyles(e.target.value)}
                className="preset-item__styles"
            />
            <button
                type="submit"
                onClick={handleSave}
                className="preset-item__save"
            >
                Save
            </button>
        </form>
    )
}
