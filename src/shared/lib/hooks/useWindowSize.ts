import { useEffect, useMemo, useState } from 'react'

type UseWindowSizeType = [number, number]

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<UseWindowSizeType>([
        window.innerWidth,
        window.innerHeight,
    ])

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight])
        }

        window.addEventListener('resize', handleWindowResize)

        return () => {
            window.removeEventListener('resize', handleWindowResize)
        }
    }, [])

    return useMemo(() => [windowSize], [windowSize])
}
