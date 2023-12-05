import { useRef, type FC, type PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Page.module.scss'
import { useInfiniteScroll } from 'src/shared/lib/hooks/useInfiniteScroll'

interface PageProps extends PropsWithChildren {
    readonly className?: string
    readonly onScrollEnd?: () => void
}

export const Page: FC<PageProps> = ({ className, children, onScrollEnd }) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const triggerRef = useRef<HTMLDivElement | null>(null)

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd,
    })

    return (
        <section
            ref={wrapperRef}
            className={classNames(classes.page, {}, [className])}
        >
            {children}
            <div ref={triggerRef}></div>
        </section>
    )
}
