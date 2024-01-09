import type { FC, PropsWithChildren } from 'react'
import type { Notification } from '../../model/types/notifications'
import { classNames } from 'src/shared/lib/style/classNames'
import { Card, CardTheme } from 'src/shared/ui/Card/Card'
import { Text } from 'src/shared/ui/Text/Text'
import { AppLink } from 'src/shared/ui/AppLink/AppLink'
import classes from './NotificationItem.module.scss'

interface NotificationItemProps extends PropsWithChildren {
    readonly className?: string
    readonly item: Notification
}

export const NotificationItem: FC<NotificationItemProps> = ({
    className,
    item,
}) => {
    const content = (
        <Card
            theme={CardTheme.OUTLINE}
            className={classNames(classes['notification-item'], {}, [
                className,
            ])}
        >
            <Text
                title={item.title}
                text={item.description}
            />
        </Card>
    )

    if (item.href) {
        return (
            <AppLink
                target="_blank"
                className={classes.link}
                to={item.href}
            >
                {content}
            </AppLink>
        )
    }

    return content
}
