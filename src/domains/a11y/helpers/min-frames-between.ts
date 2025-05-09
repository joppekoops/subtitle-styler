import Timecode, { FRAMERATE, TimecodeInstance } from 'smpte-timecode'

import { AccessibilityWarning } from '@app-a11y/entities'
import { a11yConfig } from '@app-a11y/config/a11y.config'

export const checkMinFramesBetween = (currentCueEndTime: number, nextCueStartTime: number, framerate: number): AccessibilityWarning => {

    const currentCueEndTimecode = numberToTimecodeObject(currentCueEndTime, framerate)
    const nextCueStartTimecode = numberToTimecodeObject(nextCueStartTime, framerate)

    const difference = nextCueStartTimecode.subtract(currentCueEndTimecode).frameCount

    return {
        isCompliant: difference >= a11yConfig.minFramesBetweenCues,
        title: `${difference} frames between cues`,
        message: `Recommended minimum frames between cues is ${a11yConfig.minFramesBetweenCues}`,
    }
}

const numberToTimecodeObject = (time: number, framerate: number): TimecodeInstance => new Timecode(new Date(time * 1000), framerate as FRAMERATE).subtract('01:00:00;00')