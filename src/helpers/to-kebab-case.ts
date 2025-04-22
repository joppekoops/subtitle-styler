export const toKebabCase = (string: string): string => string
    .split('')
    .map(letter => {
        if (/[A-Z]/.test(letter)) {
            return ` ${letter.toLowerCase()}`
        }
        return letter
    })
    .join('')
    .trim()
    .replace(/[_\s]+/g, '-')