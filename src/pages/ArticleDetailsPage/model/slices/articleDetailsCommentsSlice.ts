import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { Comment } from 'src/entities/Comment/commentIndex'
import type { ArticleDetailsCommentSchema } from '../types/ArticleDetailsCommentSchema'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticle'

const commentsAdapter = createEntityAdapter<Comment>({
    selectId: (comment) => comment.id,
})

export const getArticleComments = commentsAdapter.getSelectors<StateSchema>(
    (state) =>
        state.articleDetailsComments || commentsAdapter.getInitialState(),
)

const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsCommentsSlice',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentSchema>({
        loading: false,
        error: null,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state, _action) => {
                state.loading = true
            })
            .addCase(fetchCommentsByArticleId.fulfilled, (state, action) => {
                state.loading = false
                commentsAdapter.setAll(state, action.payload)
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.loading = false
                if (action.payload) {
                    state.error = action.payload
                }
            })
    },
})

export const { reducer: articleDetailsCommentsReducer } =
    articleDetailsCommentsSlice
