import { AccessibilityWarning } from '@app-a11y/entities'
import { a11yConfig } from '@app-a11y/config/a11y.config'

export const checkMaxLines = (text: string): AccessibilityWarning => {

    const lineCount = text.split('\n').length

    return {
        isCompliant: lineCount <= a11yConfig.maxLines,
        title: `${lineCount} lines`,
        message: `Recommended maximum is ${a11yConfig.maxLines} lines`,
    }
}