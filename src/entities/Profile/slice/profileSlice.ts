import { createSlice } from '@reduxjs/toolkit'
import type { ProfileSchema } from '../profileIndex'

const initialState: ProfileSchema = {
    readonly: true,
    loading: false,
    error: null,
    data: null
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
    },
})

export const { actions: profileActions, reducer: profileReducer } = profileSlice
