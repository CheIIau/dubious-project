import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { ServiceError } from 'src/shared/api/api'
import type { Article } from '../../types/article'

export const fetchArticleById = createAsyncThunk<
    Article,
    string,
    ThunkConfig<string>
>('articleDetails/fetchArticleById', async (articleId, thunkApi) => {
    try {
        const response = await thunkApi.extra.api.get<Article>(
            `/articles/${articleId}`,
            { params: { _expand: 'user' } },
        )

        if (!response.data) {
            return thunkApi.rejectWithValue('No Data')
        }

        return response.data
    } catch (e) {
        const error = e as ServiceError
        const message = error.response?.data.message || error.message
        return thunkApi.rejectWithValue(message)
    }
})
