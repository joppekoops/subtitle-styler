export const scrollIntoViewIfNeeded = (element: Element) => {
    if ('scrollIntoViewIfNeeded' in element) {
        element.scrollIntoViewIfNeeded(false)
    } else {
        element.scrollIntoView({ block: 'center' })
    }
}