import type { FC, PropsWithChildren } from 'react'
import type { Mods } from 'src/shared/lib/style/classNames'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Modal.module.scss'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'
import { useModal } from 'src/shared/lib/hooks/useModal'

interface ModalProps extends PropsWithChildren {
    readonly isOpen: boolean
    readonly className?: string
    readonly onClose?: () => void
    readonly lazy?: boolean
}

const ANIMATION_DELAY = 200

export const Modal: FC<ModalProps> = (props) => {
    const { className, onClose, isOpen, children, lazy } = props

    const { close, isClosing, isMounted } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
    })

    const mods: Mods = {
        [classes.opened]: isOpen,
        [classes['is-closing']]: isClosing,
    }

    if (lazy && !isMounted) {
        return null
    }

    return (
        <Portal>
            <div className={classNames(classes.modal, mods, [className])}>
                <Overlay onClick={close} />
                <div className={classes.content}>{children}</div>
            </div>
        </Portal>
    )
}
