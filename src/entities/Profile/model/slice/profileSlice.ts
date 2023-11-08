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
    validateError: null,
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
                ...state.form,
                ...action.payload,
            }
        },
        cancelEdit: (state) => {
            state.readonly = true
            state.form = state.data
            state.validateError = null
        },
    },
    extraReducers(builder) {
        builder
            .addCase(updateProfileData.pending, (state, _action) => {
                state.readonly = true
                state.validateError = null
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                if (typeof action.payload === 'string') {
                    state.error = action.payload
                } else if (Array.isArray(action.payload)) {
                    state.validateError = action.payload
                }
                state.loading = false
            })
            .addMatcher(
                isAnyOf(fetchProfileData.pending, updateProfileData.pending),
                (state) => {
                    state.error = null
                    state.loading = true
                },
            )
            .addMatcher(isAnyOf(fetchProfileData.rejected), (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                }
                state.loading = false
            })
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
