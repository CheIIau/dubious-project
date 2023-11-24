import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './CommentCard.module.scss'
import type { Comment } from '../../commentIndex'
import { Avatar } from 'src/shared/ui/Avatar/Avatar'
import { Text } from 'src/shared/ui/Text/Text'
import { Skeleton } from 'src/shared/ui/Skeleton/Skeleton'

interface CommentCardProps extends PropsWithChildren {
    readonly className?: string
    readonly comment: Comment
    readonly loading: boolean
}

export const CommentCard: FC<CommentCardProps> = ({
    className,
    comment,
    loading,
}) => {
    if (loading) {
        return (
            <div
                className={classNames(classes['comment-card'], {}, [className])}
            >
                <div className={classes.header}>
                    <Skeleton
                        width={30}
                        height={30}
                        border="50%"
                    />
                    <Skeleton
                        height={16}
                        width={100}
                        className="ml-3"
                    />
                </div>
                <Skeleton
                    width="100%"
                    height={50}
                    className="mt-3"
                />
            </div>
        )
    }
    return (
        <div className={classNames(classes['comment-card'], {}, [className])}>
            <div className={classes.header}>
                <Avatar
                    size={30}
                    src={comment.user.avatar}
                />
                <Text
                    className="ml-3"
                    text={comment.user.username}
                />
            </div>
            <Text
                className="mt-3"
                text={comment.text}
            />
        </div>
    )
}
