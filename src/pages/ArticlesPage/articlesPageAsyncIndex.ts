import { lazy } from 'react'

export const ArticlesPageAsync = lazy(
    () => import('./ui/ArticlesPage/ArticlesPage'),
)
