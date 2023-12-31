import {
    lazy,
    type FC,
    type PropsWithChildren,
    useCallback,
    useEffect,
} from 'react'
import { useTranslation } from 'react-i18next'
import { CommentList } from 'src/entities/Comment/commentIndex'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { classNames } from 'src/shared/lib/style/classNames'
import { Text } from 'src/shared/ui/Text/Text'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticle/fetchCommentsByArticle'

const AddCommentForm = lazy(
    () => import('src/features/addCommentForm/addCommentFormIndex'),
)

interface ArticleDetailsCommentsProps extends PropsWithChildren {
    readonly className?: string
    readonly id: string
}

export const ArticleDetailsComments: FC<ArticleDetailsCommentsProps> = ({
    className,
    id,
}) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation(['article'])
    const comments = useAppSelector(getArticleComments.selectAll)

    const articleDetailsCommentsLoading = useAppSelector(
        (state) => state.articleDetailsPage?.comments?.loading || false,
    )

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text))
        },
        [dispatch],
    )

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    }, [dispatch, id])

    return (
        <div className={classNames('', {}, [className])}>
            <Text
                className="mt-4 mb-2"
                title={t('article:comments')}
            />
            <AddCommentForm onSendComment={onSendComment} />
            <CommentList
                comments={comments}
                loading={articleDetailsCommentsLoading}
            />
        </div>
    )
}
