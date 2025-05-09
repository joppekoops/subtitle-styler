import { a11yConfig, AccessibilityWarning, translate } from '@app-a11y'

export const checkMaxCharsPerSecond = (text: string, startTime: number, endTime: number): AccessibilityWarning => {

    const charsPerSecond = Math.floor(text.length / (endTime - startTime))

    return {
        isCompliant: charsPerSecond <= a11yConfig.maxCharsPerSecond,
        title: translate('warnings.maxCharsPerSecond.title', { charsPerSecond }),
        message: translate('warnings.maxCharsPerSecond.message', { maxCharsPerSecond: a11yConfig.maxCharsPerSecond }),
    }
}