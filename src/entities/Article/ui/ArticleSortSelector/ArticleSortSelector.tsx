import { useMemo, type FC, type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'src/shared/lib/style/classNames'
import type { SelectOption } from 'src/shared/ui/Select/Select'
import classes from './ArticleSortSelector.module.scss'
import { Select } from 'src/shared/ui/Select/Select'
import { ARTICLE_SORT_FIELD } from '../../model/types/article'
import type { SortOrder } from 'src/shared/types/common'

interface ArticleSortSelectorProps extends PropsWithChildren {
    readonly className?: string
    readonly sort: keyof typeof ARTICLE_SORT_FIELD
    readonly order: SortOrder
    readonly onChangeOrder: (newOrder: SortOrder) => void
    readonly onChangeSort: (newOrder: keyof typeof ARTICLE_SORT_FIELD) => void
}

export const ArticleSortSelector: FC<ArticleSortSelectorProps> = ({
    className,
    sort,
    order,
    onChangeOrder,
    onChangeSort,
}) => {
    const { t } = useTranslation(['translation', 'article'])

    const orderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            { value: 'asc', content: t('translation:asc') },
            { value: 'desc', content: t('translation:desc') },
        ],
        [t],
    )

    const sortFieldOptions = useMemo<
        SelectOption<keyof typeof ARTICLE_SORT_FIELD>[]
    >(
        () => [
            {
                value: ARTICLE_SORT_FIELD.createdAt,
                content: t('article:createdDate'),
            },
            { value: ARTICLE_SORT_FIELD.title, content: t('article:title') },
            { value: ARTICLE_SORT_FIELD.views, content: t('article:views') },
        ],
        [t],
    )
    return (
        <div
            className={classNames(classes['article-sort-selector'], {}, [
                className,
            ])}
        >
            <Select
                label={t('article:sortBy')}
                options={sortFieldOptions}
                value={sort}
                onChange={onChangeSort}
            />
            <Select
                label={t('translation:by')}
                options={orderOptions}
                value={order}
                onChange={onChangeOrder}
                className="ml-2"
            />
        </div>
    )
}
