import { FC } from 'react'

import { setActiveCueIndex, useTypedDispatch, useTypedSelector } from '@app-redux'
import { Timeline } from '@app-compositions'

export const ConnectedTimeline: FC = () => {
    const dispatch = useTypedDispatch()
    const { cues, activeCueIndex } = useTypedSelector((state) => state.cueSlice)

    const handleCueClick = (index: number): void => {
        dispatch(setActiveCueIndex(index))
    }

    return (
        <Timeline
            cues={cues}
            activeCueIndex={activeCueIndex}
            onCueClick={handleCueClick}
        />
    )
}
