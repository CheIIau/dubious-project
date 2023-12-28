import type { UIEvent } from 'react'
import { useRef, type FC, type PropsWithChildren, useEffect } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Page.module.scss'
import { useInfiniteScroll } from 'src/shared/lib/hooks/useInfiniteScroll'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import {
    getScrollPositionByPath,
    scrollPositionSavingActions,
} from 'src/features/scrollPositionSaving/scrollPositionSavingIndex'
import { useLocation } from 'react-router-dom'
import { useThrottle } from 'src/shared/lib/hooks/useThrottle'

interface PageProps extends PropsWithChildren {
    readonly className?: string
    readonly onScrollEnd?: () => void
}

export const PAGE_ID = 'PAGE_ID'

export const Page: FC<PageProps> = ({ className, children, onScrollEnd }) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const triggerRef = useRef<HTMLDivElement | null>(null)
    const dispatch = useAppDispatch()
    const { pathname } = useLocation()
    const scrollPosition = useAppSelector((state) =>
        getScrollPositionByPath(state, pathname),
    )

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    })

    useEffect(() => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollTop = scrollPosition
        }
    }, [scrollPosition])

    const onScroll = useThrottle((event: UIEvent<HTMLDivElement>) => {
        dispatch(
            scrollPositionSavingActions.setScrollPosition({
                path: pathname,
                position: event.currentTarget.scrollTop,
            }),
        )
    }, 2000)

    return (
        <main
            ref={wrapperRef}
            className={classNames(classes.page, {}, [className])}
            onScroll={onScroll}
            id={PAGE_ID}
        >
            {children}
            {onScrollEnd && (
                <div
                    className={classes.trigger}
                    ref={triggerRef}
                ></div>
            )}
        </main>
    )
}
