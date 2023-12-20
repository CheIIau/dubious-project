import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { Article } from 'src/entities/Article/articleIndex'
import type { ArticleDetailsRecomendationSchema } from '../types/ArticleDetailsRecommendationsSchema'
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations'

const recommendationsAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
})

export const getArticleRecommendations =
    recommendationsAdapter.getSelectors<StateSchema>(
        (state) =>
            state.articleDetailsPage?.recommendations ||
            recommendationsAdapter.getInitialState(),
    )

const articleDetailsRecommendationsSlice = createSlice({
    name: 'articleDetailsRecommendationsSlice',
    initialState:
        recommendationsAdapter.getInitialState<ArticleDetailsRecomendationSchema>(
            {
                loading: false,
                error: null,
                ids: [],
                entities: {},
            },
        ),
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchArticleRecommendations.pending, (state, _action) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
                state.loading = false
                recommendationsAdapter.setAll(state, action.payload)
            })
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.loading = false
                if (action.payload) {
                    state.error = action.payload
                }
            })
    },
})

export const {
    reducer: articleDetailsRecomendationReducer,
    actions: articleDetailsRecomendationActions,
} = articleDetailsRecommendationsSlice
