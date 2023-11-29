import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ArticleList.module.scss'
import type { Article } from '../../articleIndex'
import { ARTICLE_VIEW, viewClassesMapping } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

interface ArticleListProps extends PropsWithChildren {
    readonly className?: string
    readonly articles: Article[]
    readonly loading: boolean
    readonly view?: keyof typeof ARTICLE_VIEW
}

const getSkeletons = (view: keyof typeof ARTICLE_VIEW) => {
    return new Array(view == ARTICLE_VIEW.GRID ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton
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
}) => {
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

    const renderArticle = (article: Article) => {
        return (
            <ArticleListItem
                article={article}
                view={view}
                key={article.id}
            />
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
