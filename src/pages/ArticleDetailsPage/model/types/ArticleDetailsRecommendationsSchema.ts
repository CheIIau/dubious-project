import type { EntityState } from '@reduxjs/toolkit'
import type { Article } from 'src/entities/Article/articleIndex'

export interface ArticleDetailsRecomendationSchema extends EntityState<Article> {
    loading: boolean | null
    error: string | null
}
