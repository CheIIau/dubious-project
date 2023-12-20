import type { FC, HTMLAttributeAnchorTarget, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ArticleList.module.scss'
import type { Article } from '../../articleIndex'
import { ARTICLE_VIEW, viewClassesMapping } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { useTranslation } from 'react-i18next'
import { Text } from 'src/shared/ui/Text/Text'

interface ArticleListProps extends PropsWithChildren {
    readonly className?: string
    readonly articles: Article[]
    readonly loading: boolean
    readonly view?: keyof typeof ARTICLE_VIEW
    readonly target?: HTMLAttributeAnchorTarget
}

const getSkeletons = (view: keyof typeof ARTICLE_VIEW) => {
    return new Array(view == ARTICLE_VIEW.GRID ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton
                className="mt-4"
                view={view}
                key={index}
            />
        ))
}

export const ArticleList: FC<ArticleListProps> = ({
    className,
    view = ARTICLE_VIEW.GRID,
    loading,
    articles,
    target = '_self',
}) => {
    const { t } = useTranslation('translation')

    const renderArticle = (article: Article) => {
        return (
            <ArticleListItem
                target={target}
                article={article}
                view={view}
                key={article.id}
            />
        )
    }

    if (!loading && !articles.length) {
        return (
            <Text
                title={t('nothingFound')}
                className="m-auto text-center mt-4 text-lg"
            />
        )
    }

    if (loading) {
        return (
            <div
                className={classNames(classes['article-list'], {}, [
                    className,
                    classes[viewClassesMapping[view]],
                    'gap-7',
                ])}
            >
                {getSkeletons(view)}
            </div>
        )
    }

    return (
        <div
            className={classNames(classes['article-list'], {}, [
                className,
                classes[viewClassesMapping[view]],
                'gap-7',
            ])}
        >
            {articles.length ? articles.map(renderArticle) : null}
        </div>
    )
}
