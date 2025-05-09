import { a11yConfig, AccessibilityWarning, translate } from '@app-a11y'

export const checkLineLength = (text: string): AccessibilityWarning => {

    const maxLineLength = text.split('\n').reduce((max, line) => Math.max(max, line.length), 0)

    return {
        isCompliant: maxLineLength <= a11yConfig.maxLineLength,
        title: translate('warnings.maxLineLength.title', { maxLineLength }),
        message: translate('warnings.maxLineLength.message', { maxLineLength: a11yConfig.maxLineLength }),
    }
}