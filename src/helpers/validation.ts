export const setInvalid = (input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement, message: string): void => {
    input.setCustomValidity(message)
    input.reportValidity()
}

export const clearInvalid = (input: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement): void => {
    input.setCustomValidity('')
    input.reportValidity()
}