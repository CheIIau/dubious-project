import { useEffect, type FC, type PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import { ArticleDetails } from 'src/entities/Article/articleIndex'
import { useParams } from 'react-router-dom'
import { Text } from 'src/shared/ui/Text/Text'
import { CommentList } from 'src/entities/Comment/commentIndex'
import type { ReducersList } from 'src/shared/lib/components/DynamicModuleLoader'
import { DynamicModuleLoader } from 'src/shared/lib/components/DynamicModuleLoader'
import {
    articleDetailsCommentsReducer,
    getArticleComments,
} from '../../model/slices/articleDetailsCommentsSlice'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticle'

interface ArticleDetailsPageProps extends PropsWithChildren {
    readonly className?: string
}

const reducers: ReducersList = {
    articleDetailsComments: articleDetailsCommentsReducer,
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
    const { t } = useTranslation('article')
    const { id } = useParams<{ id: string }>()
    const comments = useAppSelector(getArticleComments.selectAll)
    const articleDetailsCommentsLoading = useAppSelector(
        (state) => state.articleDetailsComments?.loading || false,
    )
    const dispatch = useAppDispatch()

    if (!id) {
        return (
            <div className={classNames('', {}, [className])}>
                {t('notFound')}
            </div>
        )
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    }, [dispatch])

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <div className={classNames('', {}, [className])}>
                <ArticleDetails id={id} />
                <Text
                    className="mt-4"
                    title={t('comments')}
                />
                <CommentList
                    comments={comments}
                    loading={articleDetailsCommentsLoading}
                />
            </div>
        </DynamicModuleLoader>
    )
}

export default ArticleDetailsPage
