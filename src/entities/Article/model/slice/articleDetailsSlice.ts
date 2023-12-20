import { createSlice } from '@reduxjs/toolkit'
import type { ArticleDetailsSchema } from '../types/articleDetailsSchema'
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById'

const initialState: ArticleDetailsSchema = {
    loading: false,
    error: null,
    data: null,
}

const articleDetailsSlice = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchArticleById.pending, (state, _action) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.loading = false
                if (action.payload) {
                    state.error = action.payload
                }
            })
    },
})

export const {
    actions: articleDetailsActions,
    reducer: articleDetailsReducer,
} = articleDetailsSlice
