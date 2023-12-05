import type { MutableRefObject } from 'react'
import { useEffect } from 'react'

export interface UseInfiniteScrollOptions {
    callback?: () => void
    triggerRef: MutableRefObject<HTMLElement | null>
    wrapperRef: MutableRefObject<HTMLElement | null>
}

export function useInfiniteScroll({
    callback,
    wrapperRef,
    triggerRef,
}: UseInfiniteScrollOptions) {
    useEffect(() => {
        if (!wrapperRef.current || !triggerRef.current || !callback) {
            return
        }
        const observingElement = triggerRef.current
        const options = {
            root: wrapperRef.current,
            rootMargin: '0px',
            threshold: 1.0,
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                callback?.()
            }
        }, options)

        observer.observe(triggerRef.current)

        return () => {
            if (observer) {
                observer.unobserve(observingElement)
            }
        }
    }, [callback, triggerRef, wrapperRef])
}
