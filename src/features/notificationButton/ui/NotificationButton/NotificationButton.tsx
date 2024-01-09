import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './NotificationButton.module.scss'
import { Popover } from 'src/shared/ui/Popups/popupsIndex'
import { BUTTON_THEME, Button } from 'src/shared/ui/Button/Button'
import { NotificationList } from 'src/entities/Notification/notificationIndex'
import NotificationIcon from 'src/shared/assets/icons/notifications.svg?react'

interface NotificationButtonProps extends PropsWithChildren {
    readonly className?: string
}

export const NotificationButton: FC<NotificationButtonProps> = ({
    className,
}) => {
    return (
        <div>
            <Popover
                className={classNames('', {}, [className])}
                direction="bottom-left"
                trigger={
                    <Button theme={BUTTON_THEME.clear}>
                        <NotificationIcon className="icon" />
                    </Button>
                }
            >
                <NotificationList className={classes.notifications} />
            </Popover>
        </div>
    )
}
