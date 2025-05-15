export const addSuffixIfNameExists = (name: string, array: { name: string; [key: string]: any }[]): string => {
    if (array.some(i => i.name === name)) {
        let suffix = 1

        while (array.some(i => i.name === `${name} ${suffix}`)) {
            suffix++
        }

        return `${name} ${suffix}`
    } else {
        return name
    }
}