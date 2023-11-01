import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'src/app/providers/StoreProvider/storeProviderIndex'
import { userActions, type User } from 'src/entities/User/userIndex'
import type { ServiceError } from 'src/shared/api/api'
import { USER_LOCALSTORAGE_KEY } from 'src/shared/const/localstorage'

export interface LoginByUsernameProps {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>('login/loginByUsername', async ({ username, password }, thunkApi) => {
    try {
        const response = await thunkApi.extra.api.post<User>('/login', {
            username,
            password,
        })

        if (!response.data?.id) {
            throw new Error('No id in server response')
        }

        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(response.data),
        )

        thunkApi.dispatch(userActions.setAuthData(response.data))

        return response.data
    } catch (e) {
        const error = e as ServiceError
        const message = error.response?.data.message || error.message
        return thunkApi.rejectWithValue(message)
    }
})
