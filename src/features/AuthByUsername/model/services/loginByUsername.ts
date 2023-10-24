import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { userActions, type User } from 'src/entities/User/userIndex'
import { API_URL, type ServiceError } from 'src/shared/config/axios/config'
import { USER_LOCALSTORAGE_KEY } from 'src/shared/const/localstorage'

interface LoginByUsernameProps {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    { rejectValue: string }
>('login/loginByUsername', async ({ username, password }, thunkApi) => {
    try {
        const response = await axios.post<User>(`${API_URL}/login`, {
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
