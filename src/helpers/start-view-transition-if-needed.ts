export const startViewTransitionIfNeeded = (callback: () => void): void => {
    if (! document.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        callback()
        return
    }

    document.startViewTransition(() => callback())
}