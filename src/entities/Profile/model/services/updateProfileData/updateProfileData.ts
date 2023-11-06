import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { ServiceError } from 'src/shared/api/api'
import type { Profile } from '../../../profileIndex'

export const updateProfileData = createAsyncThunk<
    Profile,
    undefined,
    ThunkConfig<string>
>('profile/updateProfileData', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi
    try {
        const formData = getState().profile?.form
        const response = await extra.api.put<Profile>('/profile', formData)
         
        return response.data
    } catch (e) {
        const error = e as ServiceError
        const message = error.response?.data.message || error.message
        return rejectWithValue(message)
    }
})
