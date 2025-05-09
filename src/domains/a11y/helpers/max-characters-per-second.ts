import { a11yConfig, AccessibilityWarning } from '@app-a11y'

export const checkMaxCharsPerSecond = (text: string, startTime: number, endTime: number): AccessibilityWarning => {

    const charsPerSecond = Math.floor(text.length / (endTime - startTime))

    return {
        isCompliant: charsPerSecond <= a11yConfig.maxCharsPerSecond,
        title: `${charsPerSecond} characters per second`,
        message: `Recommended maximum is ${a11yConfig.maxCharsPerSecond} characters per second`,
    }
}