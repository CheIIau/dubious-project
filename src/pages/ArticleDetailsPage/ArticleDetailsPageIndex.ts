import { lazy } from 'react'

export const ArticleDetailsPageAsync = lazy(
    () => import('./ui/ArticleDetailsPage/ArticleDetailsPage'),
)
export type { ArticleDetailsCommentSchema } from './model/types/ArticleDetailsCommentSchema'
export type { ArticleDetailsRecomendationSchema } from './model/types/ArticleDetailsRecommendationsSchema'
export type { ArticleDetailsPageSchema } from './model/types/ArticleDetailsTypes'
