import type { PayloadAction } from '@reduxjs/toolkit'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'
import {
    ARTICLE_TYPE,
    ARTICLE_VIEW,
    type Article,
} from 'src/entities/Article/articleIndex'
import type { ArticlesPageSchema } from '../types/articlesPageSchema'
import { fetchArticlesList } from '../services/fetchArticlesList'
import { ARTICLE_VIEW_LOCALSTORAGE_KEY } from 'src/shared/const/localstorage'
import { ARTICLE_SORT_FIELD } from 'src/entities/Article/articleIndex'
import type { SortOrder } from 'src/shared/types/common'

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
        page: 1,
        hasMore: true,
        _inited: false,
        limit: 9,
        order: 'asc',
        sort: ARTICLE_SORT_FIELD.createdAt,
        search: '',
        type: ARTICLE_TYPE.ALL,
    }),
    reducers: {
        setView: (state, action: PayloadAction<keyof typeof ARTICLE_VIEW>) => {
            state.view = action.payload
            localStorage.setItem(ARTICLE_VIEW_LOCALSTORAGE_KEY, action.payload)
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setOrder: (state, action: PayloadAction<SortOrder>) => {
            state.order = action.payload
        },
        setSort: (
            state,
            action: PayloadAction<keyof typeof ARTICLE_SORT_FIELD>,
        ) => {
            state.sort = action.payload
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload
        },
        setType: (state, action: PayloadAction<keyof typeof ARTICLE_TYPE>) => {
            state.type = action.payload
        },
        initState: (state) => {
            const view = localStorage.getItem(
                ARTICLE_VIEW_LOCALSTORAGE_KEY,
            ) as keyof typeof ARTICLE_VIEW
            state.view = view
            state.limit = view === ARTICLE_VIEW.LIST ? 4 : 9
            state._inited = true
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchArticlesList.pending, (state, action) => {
                state.error = null
                state.loading = true

                if (action.meta.arg.replace) {
                    articlesAdapter.removeAll(state)
                }
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.loading = false
                state.hasMore = action.payload.length >= (state.limit || 0)

                if (action.meta.arg.replace) {
                    articlesAdapter.setAll(state, action.payload)
                } else {
                    articlesAdapter.addMany(state, action.payload)
                }
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
