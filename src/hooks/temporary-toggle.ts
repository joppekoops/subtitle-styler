import { useState, useCallback } from 'react'

export const useTemporaryToggle = (duration: number = 1000): [boolean, () => void] => {
    const [value, setValue] = useState(false)

    const trigger = useCallback(() => {
        setValue(true)
        setTimeout(() => setValue(false), duration)
    }, [duration])

    return [value, trigger]
}