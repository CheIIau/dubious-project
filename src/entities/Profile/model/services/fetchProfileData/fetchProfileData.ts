import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { ServiceError } from 'src/shared/api/api'
import type { Profile } from '../../../profileIndex'

export const fetchProfileData = createAsyncThunk<
    Profile,
    undefined,
    ThunkConfig<string>
>('profile/fetchProfileData', async (_, thunkApi) => {
    try {
        const response = await thunkApi.extra.api.get<Profile>('/profile')

        return response.data
    } catch (e) {
        const error = e as ServiceError
        const message = error.response?.data.message || error.message
        return thunkApi.rejectWithValue(message)
    }
})
