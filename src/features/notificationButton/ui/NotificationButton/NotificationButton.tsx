import { useState, type FC, type PropsWithChildren, useCallback } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './NotificationButton.module.scss'
import { Popover } from 'src/shared/ui/Popups/popupsIndex'
import { BUTTON_THEME, Button } from 'src/shared/ui/Button/Button'
import { NotificationList } from 'src/entities/Notification/notificationIndex'
import NotificationIcon from 'src/shared/assets/icons/notifications.svg?react'
import { Drawer } from 'src/shared/ui/Drawer/Drawer'
import { BrowserView, MobileView } from 'react-device-detect'
import { AnimationProvider } from 'src/shared/lib/components/AnimationProvider'

interface NotificationButtonProps extends PropsWithChildren {
    readonly className?: string
}

export const NotificationButton: FC<NotificationButtonProps> = ({
    className,
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true)
    }, [])
    const onCloseDrawer = useCallback(() => {
        setIsOpen(false)
    }, [])

    const trigger = (
        <Button
            onClick={onOpenDrawer}
            theme={BUTTON_THEME.clear}
        >
            <NotificationIcon className="icon" />
        </Button>
    )

    return (
        <div>
            <MobileView>
                {trigger}

                <AnimationProvider>
                    <Drawer
                        isOpen={isOpen}
                        onClose={onCloseDrawer}
                    >
                        <NotificationList />
                    </Drawer>
                </AnimationProvider>
            </MobileView>

            <BrowserView>
                <Popover
                    className={classNames('', {}, [className])}
                    direction="bottom-left"
                    trigger={trigger}
                >
                    <NotificationList className={classes.notifications} />
                </Popover>
            </BrowserView>
        </div>
    )
}
