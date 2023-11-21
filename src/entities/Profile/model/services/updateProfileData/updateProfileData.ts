import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { ServiceError } from 'src/shared/api/api'
import type { Profile } from '../../../profileIndex'
import { validateProfileData } from '../validateProfileData/validateProfileData'
import type { ValidateProfileErrorKeyType } from '../../types/profile'

export const updateProfileData = createAsyncThunk<
    Profile,
    undefined,
    ThunkConfig<string | ValidateProfileErrorKeyType[]>
>('profile/updateProfileData', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi
    try {
        const formData = getState().profile?.form
        if (!formData) {
            return rejectWithValue('Empty form')
        }

        const errors = validateProfileData(formData)

        if (errors.length) {
            return rejectWithValue(errors)
        }

        const response = await extra.api.put<Profile>('/profile', formData)

        if (!response.data) {
            return thunkApi.rejectWithValue('No Data')
        }

        return response.data
    } catch (e) {
        const error = e as ServiceError
        const message = error.response?.data.message || error.message
        return rejectWithValue(message)
    }
})