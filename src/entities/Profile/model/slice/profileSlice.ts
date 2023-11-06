import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import type { Profile } from '../../profileIndex'
import { fetchProfileData, type ProfileSchema } from '../../profileIndex'

const initialState: ProfileSchema = {
    readonly: true,
    loading: false,
    error: null,
    data: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload
        },
        updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
            state.data = {
                ...state.data,
                ...action.payload
            }
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchProfileData.pending, (_state, _action) => {})
            .addCase(
                fetchProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.loading = false
                    state.data = action.payload
                },
            )
            .addCase(fetchProfileData.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                }
                state.loading = false
            })
            .addMatcher(isAnyOf(fetchProfileData.pending), (state) => {
                state.error = null
                state.loading = true
            })
    },
})

export const { actions: profileActions, reducer: profileReducer } = profileSlice
