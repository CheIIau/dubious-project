import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import type { LoginSchema } from '../types/loginSchema'
import { loginByUsername } from '../services/loginByUsername'

const initialState: LoginSchema = {
    loading: false,
    username: '',
    password: '',
    error: null,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginByUsername.pending, (_state, _action) => {})
            .addCase(loginByUsername.fulfilled, (state, _action) => {
                state.loading = false
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                if (action.payload) {
                    state.error = action.payload
                }
                state.loading = false
            })
            .addMatcher(isAnyOf(loginByUsername.pending), (state) => {
                state.error = null
                state.loading = true
            })
    },
})

export const { actions: loginActions, reducer: loginReducer } = loginSlice
