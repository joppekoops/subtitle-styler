import { a11yConfig, AccessibilityWarning, RGBColor, translate } from '@app-a11y'

// Color contrast as defined in the Web Content Accessibility Guidelines 2.2
// Source: https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio

const RED = 0.2126
const GREEN = 0.7152
const BLUE = 0.0722

const GAMMA = 2.4

export const checkColorContrast = (fillColor: string, boxColor: string, strokeColor: string, strokeWidth: number): AccessibilityWarning => {
    if (strokeWidth < 2) {
        const colorContrast = Math.round(calculateColorContrast(fillColor, boxColor) * 10) / 10

        return {
            isCompliant: colorContrast >= a11yConfig.minContrastRatio,
            title: translate('warnings.colorContrast.title', { colorContrast }),
            message: translate('warnings.colorContrast.messageFillBox', { minContrastRatio: a11yConfig.minContrastRatio }),
            link: translate('warnings.colorContrast.link'),
        }

    } else if (strokeWidth < 6) {
        const colorContrast = Math.round(calculateColorContrast(strokeColor, boxColor) * 10) / 10

        return {
            isCompliant: colorContrast >= a11yConfig.minContrastRatio,
            title: translate('warnings.colorContrast.title', { colorContrast }),
            message: translate('warnings.colorContrast.messageStrokeBox', { minContrastRatio: a11yConfig.minContrastRatio }),
            link: translate('warnings.colorContrast.link'),
        }

    } else {
        const colorContrast = Math.round(calculateColorContrast(fillColor, strokeColor) * 10) / 10

        return {
            isCompliant: colorContrast >= a11yConfig.minContrastRatio,
            title: translate('warnings.colorContrast.title', { colorContrast }),
            message: translate('warnings.colorContrast.messageFillStroke', { minContrastRatio: a11yConfig.minContrastRatio }),
            link: translate('warnings.colorContrast.link'),
        }
    }
}

export const calculateColorContrast = (hexColor1: string, hexColor2: string): number => {

    const rgbColor1 = hexToRgb(hexColor1)
    const rgbColor2 = hexToRgb(hexColor2)

    const L1 = calculateRelativeLuminance(rgbColor1)
    const L2 = calculateRelativeLuminance(rgbColor2)

    return L1 > L2 ? (L1 + 0.05) / (L2 + 0.05) : (L2 + 0.05) / (L1 + 0.05)
}

const calculateRelativeLuminance = (rgbColor: RGBColor): number => {
    const [R, G, B] = Object.values(rgbColor).map(v => {
        const VsRGB = v / 255
        return VsRGB <= 0.04045 ? VsRGB / 12.92 : Math.pow(((VsRGB + 0.055) / 1.055), GAMMA)
    })

    return RED * R + GREEN * G + BLUE * B
}

const hexToRgb = (hexColor: string): RGBColor => {
    return {
        r: parseInt(hexColor.substring(1, 3), 16),
        g: parseInt(hexColor.substring(3, 5), 16),
        b: parseInt(hexColor.substring(5, 7), 16),
    }
}