export const cueToWebVTT = (cue: VTTCue): string => {
    const { startTime, endTime, text } = cue

    return `${startTime} --> ${endTime}\n${text}\n\n`
}
