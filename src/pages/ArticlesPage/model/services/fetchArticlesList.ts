import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { Article } from 'src/entities/Article/articleIndex'
import type { ServiceError } from 'src/shared/api/api'

export const fetchArticlesList = createAsyncThunk<
    Article[],
    undefined,
    ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (_, thunkApi) => {
    try {
        const response = await thunkApi.extra.api.get<Article[]>(
            '/articles', {
                params: {
                    _expand: 'user'
                }
            }
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
