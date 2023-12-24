import { useEffect, useMemo, useState } from 'react'
import { throttle } from '../helpers/other'
type UseElementSizeType = [number, number]

export function useElementSize(element: HTMLElement | null) {
    const [elementSize, setElementSize] = useState<UseElementSizeType | null>(
        element
            ? [element?.clientWidth || 0, element?.clientHeight || 0]
            : null,
    )

    useEffect(() => {
        if (!element) return

        const resizeObserver = new ResizeObserver(
            throttle(() => {
                setElementSize([element.clientWidth, element.clientHeight])
            }, 300),
        )

        resizeObserver.observe(element)

        return () => resizeObserver.disconnect()
    }, [element])

    return useMemo(() => elementSize, [elementSize])
}
