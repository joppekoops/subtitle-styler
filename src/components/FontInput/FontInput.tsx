import { ChangeEvent, FC, ReactElement, useEffect, useRef, useState } from 'react'

import { Icon } from '@app-components'
import { useDialogDismiss } from '@app-hooks'

import './FontInput.scss'

export interface FontInputProps {
    label: string
    name: string
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    className?: string
}

export const FontInput: FC<FontInputProps> = ({
    label,
    name,
    value,
    onChange,
    className = '',
}): ReactElement => {
    const helpPopup = useRef<HTMLDetailsElement>(null)
    const [localFonts, setLocalFonts] = useState([])

    useDialogDismiss(helpPopup, () => helpPopup.current?.removeAttribute('open'))

    useEffect(() => {
        if ('queryLocalFonts' in window) {
            window.queryLocalFonts()
                .then((fonts) => fonts.reduce((acc, font) => {
                    if (! acc.some(f => f.family === font.family)) {
                        acc.push(font)
                    }

                    return acc
                }, []))
                .then(fonts => setLocalFonts(fonts))
        }
    }, [])

    return (
        <>
            <label className={`font-input full-width ${className}`}>
                <span className="sr-only">{label}</span>
                <input type="text"
                       name={name}
                       value={value}
                       onChange={onChange}
                       list="fontOptions"
                       className="font-input__input"
                />
                <details ref={helpPopup}>
                    <summary className="font-input__help-button button button--icon"><Icon name="info" /></summary>
                    <p className="font-input__help-text">Choose a web safe font from the drop-down, or any font on your
                        system. If you choose a font from your system you will need to install it on your website.</p>
                </details>
            </label>
            <datalist id="fontOptions">
                <option value="sans-serif" />
                <option value="serif" />
                <option value="monospace" />
                <option value="fantasy" />
                {
                    localFonts.map(font => (
                        <option value={font.family} key={font.family} />
                    ))
                }
            </datalist>
        </>
    )
}