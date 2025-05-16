export const addSuffixIfNameExists = <T extends { name: string }>(name: string, array: T[]): string => {
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