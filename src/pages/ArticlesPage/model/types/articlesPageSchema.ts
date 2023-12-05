import type { EntityState } from '@reduxjs/toolkit'
import type { ARTICLE_VIEW, Article } from 'src/entities/Article/articleIndex'

export interface ArticlesPageSchema extends EntityState<Article> {
    loading: boolean
    error: null | string
    view: keyof typeof ARTICLE_VIEW

    //pagination
    page: number
    limit?: number
    hasMore: boolean
}
