import { combineReducers } from '@reduxjs/toolkit'
import type { ArticleDetailsPageSchema } from '../types/ArticleDetailsTypes'
import { articleDetailsRecomendationReducer } from './articleDetailsPageRecommendationsSlice'
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice'

export const articleDetailsPageRecuder = combineReducers<ArticleDetailsPageSchema>({
    recommendations: articleDetailsRecomendationReducer,
    comments: articleDetailsCommentsReducer,
})
