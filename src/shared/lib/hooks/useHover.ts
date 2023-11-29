import { useCallback, useMemo, useState } from 'react'

interface UseHoverBind {
    onMouseEnter: () => void
    onMouseLeave: () => void
}

type UseHoverHook = [boolean, UseHoverBind]

export const useHover = () => {
    const [hover, setHover] = useState(false) 

    const onMouseEnter = useCallback(() => {
        setHover(true)
    }, [])

    const onMouseLeave = useCallback(() => {
        setHover(false)
    }, [])

    return useMemo<UseHoverHook>(
        () => [hover, { onMouseEnter, onMouseLeave }],
        [hover, onMouseEnter, onMouseLeave],
    )
}
