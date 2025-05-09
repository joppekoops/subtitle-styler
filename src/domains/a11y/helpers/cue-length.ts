import { a11yConfig, AccessibilityWarning, translate } from '@app-a11y'

export const checkCueLength = (startTime: number, endTime: number): AccessibilityWarning => {

    const cueLength = Math.round((endTime - startTime) * 100) / 100

    return {
        isCompliant: cueLength >= a11yConfig.minCueLengthSeconds && cueLength <= a11yConfig.maxCueLengthSeconds,
        title: translate('warnings.cueLength.title', { cueLength }),
        message: translate('warnings.cueLength.message', {
            case: cueLength > a11yConfig.maxCueLengthSeconds ? 'maximum' : 'minimum',
            recommendation: cueLength > a11yConfig.maxCueLengthSeconds ? a11yConfig.maxCueLengthSeconds : a11yConfig.minCueLengthSeconds,
        }),
    }
}