import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import { useNotifications } from '../../api/notificationApi'
import { NotificationItem } from '../NotificationItem/NotificationItem'
import { Skeleton } from 'src/shared/ui/Skeleton/Skeleton'

interface NotificationListProps extends PropsWithChildren {
    readonly className?: string
}

export const NotificationList: FC<NotificationListProps> = ({ className }) => {
    const { data: notifications, isLoading } = useNotifications(undefined, {
        pollingInterval: 5000,
    })

    if (isLoading) {
        return (
            <div
                className={classNames('', {}, [
                    className,
                    'flex flex-col gap-4',
                ])}
            >
                <Skeleton
                    width={'100%'}
                    height={92}
                />
                <Skeleton
                    width={'100%'}
                    height={92}
                />
                <Skeleton
                    width={'100%'}
                    height={92}
                />
            </div>
        )
    }

    return (
        <div className={classNames('', {}, [className, 'flex flex-col gap-4'])}>
            {notifications?.map((notification) => (
                <NotificationItem
                    item={notification}
                    key={notification.id}
                />
            ))}
        </div>
    )
}
