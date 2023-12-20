import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'src/app/providers/StoreProvider/storeProviderIndex'
import { type Article } from 'src/entities/Article/articleIndex'
import type { ServiceError } from 'src/shared/api/api'

export const fetchArticleRecommendations = createAsyncThunk<
    Article[],
    undefined,
    ThunkConfig<string>
>('articleDetailsPage/fetchArticleRecommendations', async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi

    try {
        const response = await extra.api.get<Article[]>('/articles', {
            params: {
                _limit: 4,
            },
        })

        if (!response.data) {
            return rejectWithValue('No Data')
        }

        return response.data
    } catch (e) {
        const error = e as ServiceError
        const message = error.response?.data.message || error.message
        return rejectWithValue(message)
    }
})
