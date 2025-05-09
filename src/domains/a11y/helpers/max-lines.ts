import { a11yConfig, AccessibilityWarning } from '@app-a11y'

export const checkMaxLines = (text: string): AccessibilityWarning => {

    const lineCount = text.split('\n').length

    return {
        isCompliant: lineCount <= a11yConfig.maxLines,
        title: `${lineCount} lines`,
        message: `Recommended maximum is ${a11yConfig.maxLines} lines`,
    }
}