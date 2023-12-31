import { useEffect, type FC, type PropsWithChildren } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ARTICLE_VIEW, ArticleList } from 'src/entities/Article/articleIndex'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { initArticlesPage } from '../../model/services/initArticlesPage'
import { getArticles } from '../../model/slices/articlesPageSlice'
import { TEXT_THEME, Text } from 'src/shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'

interface ArticlesInfiniteListProps extends PropsWithChildren {
    readonly className?: string
}

export const ArticlesInfiniteList: FC<ArticlesInfiniteListProps> = ({
    className,
}) => {
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
    const [searchParams] = useSearchParams()

    useEffect(() => {
        dispatch(initArticlesPage(searchParams))
    }, [dispatch, searchParams])

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
        <ArticleList
            view={view}
            articles={articles}
            loading={loading}
            className={className}
        />
    )
}
