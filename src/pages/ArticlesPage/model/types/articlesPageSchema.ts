import type { EntityState } from '@reduxjs/toolkit'
import type { ARTICLE_VIEW, Article } from 'src/entities/Article/articleIndex'
import type { SortOrder } from 'src/shared/types/common'
import type {
    ARTICLE_SORT_FIELD,
    ARTICLE_TYPE,
} from 'src/entities/Article/articleIndex'
export interface ArticlesPageSchema extends EntityState<Article> {
    loading: boolean
    error: null | string

    //pagination
    page: number
    limit?: number
    hasMore: boolean

    //filters
    view: keyof typeof ARTICLE_VIEW
    order: SortOrder
    sort: keyof typeof ARTICLE_SORT_FIELD
    search: string
    type: keyof typeof ARTICLE_TYPE

    _inited?: boolean
}
