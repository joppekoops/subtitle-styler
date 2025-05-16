import { RefObject, useEffect } from 'react'

export const useDialogDismiss = (dialogElement: RefObject<HTMLElement | null>, onDismiss: () => unknown): void => {
    const handleKeyboardEvent = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            onDismiss()
        }
    }

    const handleMouseEvent = (event: MouseEvent) => {
        if (dialogElement.current && event.target instanceof Element) {
            if (! dialogElement.current.contains(event.target)) {
                onDismiss()
            }
        }
    }

    useEffect(() => {
        window.addEventListener('keyup', handleKeyboardEvent)
        window.addEventListener('mouseup', handleMouseEvent)

        return () => {
            window.removeEventListener('keyup', handleKeyboardEvent)
            window.removeEventListener('mouseup', handleMouseEvent)
        }
    }, [])
}