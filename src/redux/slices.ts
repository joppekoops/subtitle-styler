import { combineSlices } from '@reduxjs/toolkit'

import { cueSlice, CueState } from './cue'
import { videoSlice, VideoState } from './video'
import { styleSlice, StyleState } from './style'

export interface Slices {
    cueSlice: CueState
    videoSlice: VideoState
    styleSlice: StyleState
}

export const slices = combineSlices(
    cueSlice,
    videoSlice,
    styleSlice,
)
