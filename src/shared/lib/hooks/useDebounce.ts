import { useCallback, useRef } from 'react'

export function useDebounce(
    callback: (...args: any[]) => void,
    delay: number = 1000,
) {
    const timer = useRef<NodeJS.Timeout | null>(null)

    return useCallback(
        (...args: any[]) => {
            if (timer.current) {
                clearTimeout(timer.current)
            }

            timer.current = setTimeout(() => {
                callback(...args)
            }, delay)
        },
        [callback, delay],
    )
}
