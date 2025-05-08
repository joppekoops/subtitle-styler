import { AccessibilityWarning } from '@app-a11y/entities'
import { a11yConfig } from '@app-a11y/config/a11y.config'

export const checkCueLength = (startTime: number, endTime: number): AccessibilityWarning => {

    const cueLength = Math.round((endTime - startTime) * 100) / 100

    return {
        isCompliant: cueLength >= a11yConfig.minCueLengthSeconds && cueLength <= a11yConfig.maxCueLengthSeconds,
        title: `${cueLength} seconds long`,
        message: `
            Recommended 
            ${cueLength > a11yConfig.maxCueLengthSeconds ? 'maximum' : 'minimum'}
             is 
            ${cueLength > a11yConfig.maxCueLengthSeconds ? a11yConfig.maxCueLengthSeconds : a11yConfig.minCueLengthSeconds}
             seconds
         `,
    }
}