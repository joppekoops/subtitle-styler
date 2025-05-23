import { FC, FocusEvent, FormEvent, ReactElement } from 'react'
import { Icon } from '@app-components'

import './Export.scss'

export interface ExportProps {
    onExport: (filename: string) => void
    className?: string
}

export const Export: FC<ExportProps> = ({
    onExport,
    className = '',
}): ReactElement => {
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formdata = new FormData(event.currentTarget)

        onExport(formdata.get('filename') as string)
    }

    const selectName = (event: FocusEvent<HTMLInputElement>) => {
        const filename = event.currentTarget.value.split('.')[0]
        event.currentTarget.setSelectionRange(0, filename.length)
    }

    return (
        <div className={`export ${className}`}>
            <div className="export__description">
                <h2>Export</h2>
                <p>Download your subtitles as a WebVTT file for use on a website.</p>
                <a href="#">
                    <Icon name="manual" />
                    Documentation for developers
                </a>
            </div>

            <form className="export__form" onSubmit={onSubmit}>

                <label>
                    Filename
                    <input type="text" name="filename" defaultValue="captions.vtt" required onFocus={selectName} />
                </label>

                <button className="button button--primary" type="submit">Export...</button>
            </form>
        </div>
    )
}