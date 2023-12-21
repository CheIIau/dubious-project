import { lazy } from 'react'

export const ArticleDetailsPageAsync = lazy(
    () => import('./ui/ArticleDetailsPage/ArticleDetailsPage'),
)
