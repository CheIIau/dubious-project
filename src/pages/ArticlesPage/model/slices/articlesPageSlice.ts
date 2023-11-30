import type { PayloadAction } from '@reduxjs/toolkit'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'
import { ARTICLE_VIEW, type Article } from 'src/entities/Article/articleIndex'
import type { ArticlesPageSchema } from '../types/articlesPageSchema'
import { fetchArticlesList } from '../services/fetchArticlesList'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'src/shared/const/localstorage'

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
})

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
)

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        loading: false,
        error: null,
        view: ARTICLE_VIEW.GRID,
        ids: [],
        entities: {},
    }),
    reducers: {
        setView: (state, action: PayloadAction<keyof typeof ARTICLE_VIEW>) => {
            state.view = action.payload
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload)
        },
        initState: (state) => {
            state.view = localStorage.getItem(
                ARTICLE_VIEW_LOCALSTORAGE_KEY,
            ) as keyof typeof ARTICLE_VIEW
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchArticlesList.pending, (state, _action) => {
                state.error = null
                state.loading = true
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.loading = false
                articlesAdapter.setAll(state, action.payload)
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                }
                state.loading = false
            })
    },
})

export const { reducer: articlesPageReducer, actions: articlesPageActions } =
    articlesPageSlice
