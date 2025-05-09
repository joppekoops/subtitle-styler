import { a11yConfig, AccessibilityWarning, translate } from '@app-a11y'

export const checkMaxLines = (text: string): AccessibilityWarning => {

    const lineCount = text.split('\n').length

    return {
        isCompliant: lineCount <= a11yConfig.maxLines,
        title: translate('warnings.maxLines.title', { lineCount }),
        message: translate('warnings.maxLines.message', { maxLines: a11yConfig.maxLines }),
    }
}