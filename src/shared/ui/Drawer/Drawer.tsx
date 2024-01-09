import type { FC, PropsWithChildren } from 'react'
import type { Mods } from 'src/shared/lib/style/classNames'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Drawer.module.scss'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'

interface DrawerProps extends PropsWithChildren {
    readonly className?: string
    readonly isOpen?: boolean
    readonly onClose?: () => void
}

export const Drawer: FC<DrawerProps> = ({
    className,
    children,
    isOpen,
    onClose,
}) => {
    const mods: Mods = {
        [classes.opened]: isOpen,
    }
    return (
        <Portal>
            <div className={classNames(classes.drawer, mods, [className])}>
                <Overlay onClick={onClose} />
                <div className={classes.content}>{children}</div>
            </div>
        </Portal>
    )
}
