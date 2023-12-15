import { useCallback, type FC, type PropsWithChildren, useMemo } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ArticlesPageFilters.module.scss'
import type { ARTICLE_SORT_FIELD } from 'src/entities/Article/articleIndex'
import {
    ARTICLE_VIEW,
    ArticleSortSelector,
    ArticleViewSelector,
} from 'src/entities/Article/articleIndex'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { articlesPageActions } from '../../model/slices/articlesPageSlice'
import { useTranslation } from 'react-i18next'
import { Input } from 'src/shared/ui/Input/Input'
import { Card } from 'src/shared/ui/Card/Card'
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
} from '../../model/selectors/articlePageSelectors'
import type { SortOrder } from 'src/shared/types/common'
import { fetchArticlesList } from '../../model/services/fetchArticlesList'
import { useDebounce } from 'src/shared/lib/hooks/useDebounce'
import type { TabItem } from 'src/shared/ui/Tabs/Tabs'
import { Tabs } from 'src/shared/ui/Tabs/Tabs'
import type { ARTICLE_TYPE } from 'src/entities/Article/articleIndex'
import { ArticleTypeTabs } from 'src/features/ArticleTypeTabs/ArticleTypeTabs'

interface ArticlesPageFiltersProps extends PropsWithChildren {
    readonly className?: string
}

export const ArticlesPageFilters: FC<ArticlesPageFiltersProps> = ({
    className,
}) => {
    const dispatch = useAppDispatch()

    const view = useAppSelector(
        (state) => state.articlesPage?.view || ARTICLE_VIEW.GRID,
    )
    const order = useAppSelector(getArticlesPageOrder)
    const sort = useAppSelector(getArticlesPageSort)
    const search = useAppSelector(getArticlesPageSearch)
    const type = useAppSelector(getArticlesPageType)

    const { t } = useTranslation(['translation', 'article'])

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }))
    }, [dispatch])

    const debouncedFetchData = useDebounce(fetchData)

    const onChangeView = useCallback(
        (view: keyof typeof ARTICLE_VIEW) => {
            dispatch(articlesPageActions.setView(view))
        },
        [dispatch],
    )
    const onChangeSort = useCallback(
        (sort: keyof typeof ARTICLE_SORT_FIELD) => {
            dispatch(articlesPageActions.setSort(sort))
            dispatch(articlesPageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData],
    )
    const onChangeOrder = useCallback(
        (order: SortOrder) => {
            dispatch(articlesPageActions.setOrder(order))
            dispatch(articlesPageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData],
    )
    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(articlesPageActions.setSearch(search))
            dispatch(articlesPageActions.setPage(1))
            debouncedFetchData()
        },
        [dispatch, debouncedFetchData],
    )
    const onChangeType = useCallback(
        (value: keyof typeof ARTICLE_TYPE) => {
            dispatch(articlesPageActions.setType(value))
            dispatch(articlesPageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData],
    )

    return (
        <div className={classNames('', {}, [className])}>
            <div className={classes['sort-wrapper']}>
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector
                    view={view}
                    onViewClick={onChangeView}
                    className="mb-2 flex justify-end"
                />
            </div>
            <Card className="mt-4">
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    placeholder={t('translation:search')}
                />
            </Card>
            <ArticleTypeTabs
                value={type}
                className='mt-3 gap-3'
                onChangeType={onChangeType}
            />
        </div>
    )
}
