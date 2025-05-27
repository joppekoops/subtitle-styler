import { FC } from 'react'

import { Export } from '@app-compositions'
import { useTypedSelector } from '@app-redux'
import { dataToVtt, exportAsFile } from '@app-helpers'

export const ConnectedExport: FC = () => {
    const { globalStyles, presets } = useTypedSelector(state => state.styleSlice)
    const { cues } = useTypedSelector(state => state.cueSlice)

    const handleExport = async (filename: string) => {
        const vtt = await dataToVtt(cues, globalStyles, presets)

        try {
            await exportAsFile(vtt, filename, [{ accept: { 'text/vtt': ['.vtt'] } }])
        } catch (error) {
            if (error instanceof DOMException) {
                switch (error.name) {
                    case 'AbortError':
                        return
                    default:
                        console.error(error)
                        return
                }
            } else {
                console.error(error)
            }
        }
    }

    return (
        <Export onExport={handleExport} />
    )
}