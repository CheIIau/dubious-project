import type { ArticleDetailsCommentSchema } from './ArticleDetailsCommentSchema'
import type { ArticleDetailsRecomendationSchema } from './ArticleDetailsRecommendationsSchema'

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentSchema
    recommendations: ArticleDetailsRecomendationSchema
}