import type { FC, PropsWithChildren } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { Mods } from 'src/shared/lib/style/classNames'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Modal.module.scss'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'

interface ModalProps extends PropsWithChildren {
    readonly isOpen: boolean
    readonly className?: string
    readonly onClose?: () => void
    readonly lazy?: boolean
}

export const Modal: FC<ModalProps> = (props) => {
    const { className, onClose, isOpen, children, lazy } = props
    const [isClosing, setIsClosing] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
        }
    }, [isOpen])

    const ANIMATION_DELAY = 200
    const timerRef = useRef<ReturnType<typeof setTimeout>>()

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, ANIMATION_DELAY)
        }
    }, [onClose, setIsClosing])

    const mods: Mods = {
        [classes.opened]: isOpen,
        [classes['is-closing']]: isClosing,
    }
    const onKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeHandler()
            }
        },
        [closeHandler],
    )

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }
        return () => {
            clearTimeout(timerRef.current)
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    if (lazy && !isMounted) {
        return null
    }

    return (
        <Portal>
            <div className={classNames(classes.modal, mods, [className])}>
                <Overlay onClick={closeHandler} />
                <div className={classes.content}>{children}</div>
            </div>
        </Portal>
    )
}
