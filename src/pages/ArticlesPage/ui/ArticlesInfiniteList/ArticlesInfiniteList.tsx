import { type FC, type PropsWithChildren } from 'react'
import { ARTICLE_VIEW, ArticleList } from 'src/entities/Article/articleIndex'
import { useAppSelector } from 'src/shared/lib/hooks/storeHooks'
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
    const articles = useAppSelector(getArticles.selectAll)
    const loading = useAppSelector(
        (state) => state.articlesPage?.loading || false,
    )
    const view = useAppSelector(
        (state) => state.articlesPage?.view || ARTICLE_VIEW.GRID,
    )
    const error = useAppSelector((state) => state.articlesPage?.error)

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
