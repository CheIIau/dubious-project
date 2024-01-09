import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Overlay.module.scss'

interface OverlayProps extends PropsWithChildren {
    readonly className?: string
    readonly onClick?: () => void
}

export const Overlay: FC<OverlayProps> = ({ className, onClick }) => {
    return (
        <div
            onClick={onClick}
            className={classNames(classes.overlay, {}, [className])}
        ></div>
    )
}
