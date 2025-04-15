import Timecode, { FRAMERATE } from 'smpte-timecode'

export const numberToTimeString = (time: number): string => (new Date(time * 1000)).toISOString().substring(11, 23)

export const numberToTimecode = (time: number, framerate: number): string => new Timecode(new Date(time * 1000), framerate as FRAMERATE).subtract('01:00:00;00').toString()

export const timecodeToNumber = (timecode: string, framerate: number): number => new Timecode(timecode, framerate as FRAMERATE).valueOf() / framerate