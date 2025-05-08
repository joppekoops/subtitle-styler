import { AccessibilityWarning } from '@app-a11y/entities'
import { a11yConfig } from '@app-a11y/config/a11y.config'

export const checkLineLength = (text: string): AccessibilityWarning => {

    const maxLineLength = text.split('\n').reduce((max, line) => Math.max(max, line.length), 0)

    return {
        isCompliant: maxLineLength <= a11yConfig.maxLineLength,
        title: `${maxLineLength} characters`,
        message: `Recommended maximum line length is ${a11yConfig.maxLineLength} characters`,
    }
}