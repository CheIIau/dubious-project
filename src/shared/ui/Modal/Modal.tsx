import type { FC, PropsWithChildren } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Modal.module.scss'
import { Portal } from '../Portal/Portal'
import { useTheme } from 'src/app/providers/ThemeProvider/themeProviderIndex'

interface ModalProps extends PropsWithChildren {
    readonly isOpen: boolean
    readonly className?: string
    readonly onClose?: () => void
}

export const Modal: FC<ModalProps> = (props) => {
    const { className, onClose, isOpen, children } = props
    const [isClosing, setIsClosing] = useState(false)
    const ANIMATION_DELAY = 200
    const timerRef = useRef<ReturnType<typeof setTimeout>>()
    const { theme } = useTheme()

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, ANIMATION_DELAY)
        }
    }, [onClose])

    const onContentClick = (event: React.MouseEvent) => {
        event.stopPropagation()
    }

    const mods: Record<string, boolean> = {
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

    return (
        <Portal>
            <div
                className={classNames(classes.modal, mods, [className, theme])}
            >
                <div
                    className={classes.overlay}
                    onClick={closeHandler}
                >
                    <div
                        className={classes.content}
                        onClick={onContentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    )
}
