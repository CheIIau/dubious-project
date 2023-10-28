import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { User, UserSchema } from '../types/user'
import { USER_LOCALSTORAGE_KEY } from 'src/shared/const/localstorage'

const initialState: UserSchema = {
    authData: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData(state, action: PayloadAction<User>) {
            state.authData = action.payload
        },
        initAuthData(state) {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
            if (user) {
                state.authData = JSON.parse(user)
            }
        },
        logout(state) {
            state.authData = null
            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
        },
    },
})

export const { actions: userActions, reducer: userReducer } = userSlice
