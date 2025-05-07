import { RGBColor } from '@app-entities'

// Color contrast as defined in the Web Content Accessibility Guidelines 2.2
// Source: https://www.w3.org/TR/WCAG22/#dfn-contrast-ratio

const RED = 0.2126
const GREEN = 0.7152
const BLUE = 0.0722

const GAMMA = 2.4

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