import {
    useCallback,
    type FC,
    type PropsWithChildren,
    useEffect,
    memo,
} from 'react'
import type { Mods } from 'src/shared/lib/style/classNames'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Drawer.module.scss'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'
import { useModal } from 'src/shared/lib/hooks/useModal'
import type { AnimationContextPayload } from 'src/shared/lib/components/AnimationProvider'
import {
    AnimationProvider,
    useAnimationLibs,
} from 'src/shared/lib/components/AnimationProvider'

interface DrawerProps extends PropsWithChildren {
    readonly className?: string
    readonly isOpen?: boolean
    readonly onClose?: () => void
    readonly lazy?: boolean
}

const ANIMATION_DELAY = 200
const height = window.innerHeight - 100

export const DrawerContent: FC<DrawerProps> = ({
    className,
    children,
    isOpen,
    lazy,
    onClose,
}) => {
    const { Spring, Gesture } =
        useAnimationLibs() as Required<AnimationContextPayload>
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }))

    const { isClosing, isMounted } = useModal({
        animationDelay: ANIMATION_DELAY,
        onClose,
        isOpen,
    })

    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false })
    }, [api])

    useEffect(() => {
        if (isOpen) {
            openDrawer()
        }
    }, [api, isOpen, openDrawer])

    const mods: Mods = {
        [classes.opened]: isOpen,
        [classes['is-closing']]: isClosing,
    }

    const close = () => {
        api.start({
            y: height,
            immediate: false,
            config: { ...Spring.config.stiff, velocity: 2 },
            onResolve: onClose,
        })
    }

    const bind = Gesture.useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            movement: [, my],
            cancel,
        }) => {
            if (my < -70) cancel()

            if (last) {
                if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
                    close()
                } else {
                    openDrawer()
                }
            } else {
                api.start({ y: my, immediate: true })
            }
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true,
        },
    )

    if (!isOpen) {
        return null
    }

    const display = y.to((py) => (py < height ? 'block' : 'none'))

    if (lazy && !isMounted) {
        return null
    }

    return (
        <Portal>
            <div className={classNames(classes.drawer, mods, [className])}>
                <Overlay onClick={close} />
                <Spring.a.div
                    className={classes.sheet}
                    style={{
                        display,
                        bottom: `calc(-100vh + ${height - 100}px)`,
                        y,
                    }}
                    {...bind()}
                >
                    {children}
                </Spring.a.div>
            </div>
        </Portal>
    )
}

const DrawerAsync = memo<DrawerProps>(function Drawer(props) {
    const { isLoaded } = useAnimationLibs()

    if (!isLoaded) {
        return null
    }

    return <DrawerContent {...props} />
})

export const Drawer: FC<DrawerProps> = (props) => {
    return (
        <AnimationProvider>
            <DrawerAsync {...props} />
        </AnimationProvider>
    )
}
