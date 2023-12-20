import {
    useEffect,
    type FC,
    type PropsWithChildren,
    lazy,
    useCallback,
} from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import { useTranslation } from 'react-i18next'
import { ArticleDetails, ArticleList } from 'src/entities/Article/articleIndex'
import { useParams } from 'react-router-dom'
import { Text } from 'src/shared/ui/Text/Text'
import { CommentList } from 'src/entities/Comment/commentIndex'
import type { ReducersList } from 'src/shared/lib/components/DynamicModuleLoader'
import { DynamicModuleLoader } from 'src/shared/lib/components/DynamicModuleLoader'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticle/fetchCommentsByArticle'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { BUTTON_THEME, Button } from 'src/shared/ui/Button/Button'
import { AppLink } from 'src/shared/ui/AppLink/AppLink'
import { RouterPaths } from 'src/app/providers/router/routerIndex'
import { Page } from 'src/widgets/Page/Page'
import { getArticleRecommendations } from '../../model/slices/articleDetailsPageRecommendationsSlice'
import { fetchArticleRecommendations } from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations'
import { articleDetailsPageRecuder } from '../../model/slices/articleDetailsSliceIndex'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'

const AddCommentForm = lazy(
    () => import('src/features/addCommentForm/addCommentFormIndex'),
)

interface ArticleDetailsPageProps extends PropsWithChildren {
    readonly className?: string
}

const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageRecuder,
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
    const { t } = useTranslation(['article', 'translation'])
    const { id } = useParams<{ id: string }>()

    const comments = useAppSelector(getArticleComments.selectAll)
    const recommendations = useAppSelector(getArticleRecommendations.selectAll)

    const articleDetailsCommentsLoading = useAppSelector(
        (state) => state.articleDetailsPage?.comments?.loading || false,
    )
    const dispatch = useAppDispatch()

    const recommendationsLoading = useAppSelector(
        (state) => state.articleDetailsPage?.recommendations?.loading || false,
    )

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text))
        },
        [dispatch],
    )

    if (!id) {
        return (
            <Page className={classNames('', {}, [className])}>
                {t('article:notFound')}
            </Page>
        )
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
        dispatch(fetchArticleRecommendations())
    }, [dispatch, id])

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames('', {}, [className])}>
                <ArticleDetailsPageHeader />
                <ArticleDetails id={id} />
                <Text
                    className="mt-4 mb-3"
                    title={t('translation:recommendations')}
                />

                <ArticleList
                    target="_blank"
                    articles={recommendations}
                    loading={recommendationsLoading}
                    className="flex !flex-nowrap overflow-x-auto overflow-y-hidden !justify-normal"
                />
                <Text
                    className="mt-4 mb-2"
                    title={t('article:comments')}
                />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    comments={comments}
                    loading={articleDetailsCommentsLoading}
                />
            </Page>
        </DynamicModuleLoader>
    )
}

export default ArticleDetailsPage
