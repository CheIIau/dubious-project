import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './CommentList.module.scss'
import { useTranslation } from 'react-i18next'
import { Text } from 'src/shared/ui/Text/Text'
import { CommentCard } from '../CommentCard/CommentCard'
import type { Comment } from '../../commentIndex'

interface CommentListProps extends PropsWithChildren {
    readonly className?: string
    readonly comments: Comment[]
    readonly loading: boolean
}

export const CommentList: FC<CommentListProps> = ({
    className,
    comments,
    loading,
}) => {
    const { t } = useTranslation('article')

    if (loading) {
        return (
            <div className={classNames('', {}, [className])}>
                {new Array(3).fill('').map((comment) => (
                    <CommentCard
                        className="mt-4"
                        loading={true}
                        key={comment}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className={classNames('', {}, [className])}>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard
                        className="mt-4"
                        comment={comment}
                        loading={loading}
                        key={comment.id}
                    />
                ))
            ) : (
                <Text text={t('noComments')} />
            )}
        </div>
    )
}
