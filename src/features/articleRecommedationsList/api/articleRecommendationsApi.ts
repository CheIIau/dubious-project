import type { Article } from 'src/entities/Article/articleIndex'
import { rtkApi } from 'src/shared/api/rtkApi'

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
            providesTags: ['Recommendations'],
        }),
    }),
})

export const useArticleRecommendationsList =
    recommendationsApi.useGetArticleRecommendationsListQuery
