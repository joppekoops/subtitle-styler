export const waitUntil = async (
    condition: () => boolean,
    timeout: number = 50,
): Promise<void> => {
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (condition()) {
                clearInterval(interval)
                resolve()
            }
        }, timeout)
    })
}