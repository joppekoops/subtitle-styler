import Timecode, { FRAMERATE, TimecodeInstance } from 'smpte-timecode'

import { a11yConfig, AccessibilityWarning, translate } from '@app-a11y'

export const checkMinFramesBetween = (currentCueEndTime: number, nextCueStartTime: number, framerate: number): AccessibilityWarning => {

    const currentCueEndTimecode = numberToTimecodeObject(currentCueEndTime, framerate)
    const nextCueStartTimecode = numberToTimecodeObject(nextCueStartTime, framerate)

    const difference = nextCueStartTimecode.frameCount - currentCueEndTimecode.frameCount

    return {
        isCompliant: difference >= a11yConfig.minFramesBetweenCues || Math.sign(difference) === -1,
        title: translate('warnings.minFramesBetween.title', { framesBetweenCues: difference }),
        message: translate('warnings.minFramesBetween.message', { minFramesBetweenCues: a11yConfig.minFramesBetweenCues }),
    }
}

const numberToTimecodeObject = (time: number, framerate: number): TimecodeInstance => new Timecode(new Date(time * 1000), framerate as FRAMERATE).subtract('01:00:00;00')