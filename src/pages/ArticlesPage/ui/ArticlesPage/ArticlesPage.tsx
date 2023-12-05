import { useEffect, type FC, type PropsWithChildren, useCallback } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import {
    ARTICLE_VIEW,
    ArticleList,
    ArticleViewSelector,
} from 'src/entities/Article/articleIndex'
import {
    DynamicModuleLoader,
    type ReducersList,
} from 'src/shared/lib/components/DynamicModuleLoader'
import {
    articlesPageActions,
    articlesPageReducer,
    getArticles,
} from '../../model/slices/articlesPageSlice'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { fetchArticlesList } from '../../model/services/fetchArticlesList'
import { TEXT_THEME, Text } from 'src/shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { Page } from 'src/shared/ui/Page/Page'
import { useInfiniteScroll } from 'src/shared/lib/hooks/useInfiniteScroll'
import { fetchNextArtclesPage } from '../../model/services/fetchNextArticlesPage'

interface ArticlesPageProps extends PropsWithChildren {
    readonly className?: string
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
}

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const articles = useAppSelector(getArticles.selectAll)
    const loading = useAppSelector(
        (state) => state.articlesPage?.loading || false,
    )
    const view = useAppSelector(
        (state) => state.articlesPage?.view || ARTICLE_VIEW.GRID,
    )

    const error = useAppSelector((state) => state.articlesPage?.error)

    const onChangeView = useCallback(
        (view: keyof typeof ARTICLE_VIEW) => {
            dispatch(articlesPageActions.setView(view))
        },
        [dispatch],
    )

    useEffect(() => {
        dispatch(articlesPageActions.initState())
        dispatch(
            fetchArticlesList({
                page: 1,
            }),
        )
    }, [dispatch])

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArtclesPage())
    }, [dispatch])

    if (error) {
        return (
            <div className="mt-2 flex justify-center items-center text-center">
                <Text
                    theme={TEXT_THEME.error}
                    title={t('error')}
                />
            </div>
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page
                onScrollEnd={onLoadNextPart}
                className={classNames('', {}, [className])}
            >
                <ArticleViewSelector
                    view={view}
                    onViewClick={onChangeView}
                    className="mb-2 flex justify-end"
                />
                <ArticleList
                    view={view}
                    articles={articles}
                    loading={loading}
                />
            </Page>
        </DynamicModuleLoader>
    )
}

export default ArticlesPage
