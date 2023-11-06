import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import type { Profile } from '../../profileIndex'
import { fetchProfileData, type ProfileSchema } from '../../profileIndex'
import { updateProfileData } from '../services/updateProfileData/updateProfileData'

const initialState: ProfileSchema = {
    readonly: true,
    loading: false,
    error: null,
    data: null,
    form: null,
}

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadonly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload
        },
        updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
            state.form = {
                ...state.data,
                ...action.payload,
            }
        },
        cancelEdit: (state) => {
            state.readonly = true
            state.form = state.data
        },
    },
    extraReducers(builder) {
        builder
            // .addCase(fetchProfileData.pending, (_state, _action) => {})
            .addMatcher(
                isAnyOf(fetchProfileData.pending, updateProfileData.pending),
                (state) => {
                    state.error = null
                    state.loading = true
                },
            )
            .addMatcher(
                isAnyOf(fetchProfileData.rejected, updateProfileData.rejected),
                (state, action) => {
                    if (action.payload) {
                        state.error = action.payload
                    }
                    state.loading = false
                },
            )
            .addMatcher(
                isAnyOf(
                    fetchProfileData.fulfilled,
                    updateProfileData.fulfilled,
                ),
                (state, action) => {
                    state.loading = false
                    state.data = action.payload
                    state.form = action.payload
                },
            )
    },
})

export const { actions: profileActions, reducer: profileReducer } = profileSlice
