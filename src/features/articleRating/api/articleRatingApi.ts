import { rtkApi } from 'src/shared/api/rtkApi'
import type { Rating } from 'src/entities/Rating/ratingCardIndex'

interface GetArticleRatingRequest {
    userId: string
    articleId: string
}

interface RateArticleRequest {
    userId: string
    articleId: string
    rate: number
    feedback?: string
}

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating[], GetArticleRatingRequest>({
            query: ({ articleId, userId }) => ({
                url: '/article-ratings',
                params: {
                    userId,
                    articleId,
                },
            }),
            providesTags: ['ArticleRating'],
        }),
        rateArticle: build.mutation<
            // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
            void,
            RateArticleRequest
        >({
            query: (arg) => ({
                url: '/article-ratings',
                method: 'POST',
                body: arg,
            }),
            invalidatesTags: ['ArticleRating'],
        }),
    }),
})

export const useArticleRating = articleRatingApi.useGetArticleRatingQuery
export const useRateArticle = articleRatingApi.useRateArticleMutation
