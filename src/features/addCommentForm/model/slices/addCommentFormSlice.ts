import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { AddCommentFormSchema } from '../types/addCommentForm'

const initialState: AddCommentFormSchema = {
    error: null,
    text: '',
}

const addCommentForm = createSlice({
    name: 'addCommentForm',
    initialState,
    reducers: {
        setText(state, action: PayloadAction<string>) {
            state.text = action.payload
        },
    },
    // extraReducers(builder) {
    // builder
    //     .addCase(loginByUsername.pending, (_state, _action) => {})
    //     .addCase(loginByUsername.fulfilled, (state, _action) => {
    //         state.loading = false
    //     })
    //     .addCase(loginByUsername.rejected, (state, action) => {
    //         if (action.payload) {
    //             state.error = action.payload
    //         }
    //         state.loading = false
    //     })
    //     .addMatcher(isAnyOf(loginByUsername.pending), (state) => {
    //         state.error = null
    //         state.loading = true
    //     })
    // },
})

export const {
    actions: addCommentFormActions,
    reducer: addCommentFormReducer,
} = addCommentForm
