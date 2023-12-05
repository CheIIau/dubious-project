import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { Article } from 'src/entities/Article/articleIndex'
import type { ServiceError } from 'src/shared/api/api'
import { getArticlesPageLimit } from '../selectors/articlePageSelectors'
interface fetchArticlesListProps {
    page?: number
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    fetchArticlesListProps,
    ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
    const { extra, getState, rejectWithValue } = thunkApi
    const { page = 1 } = props
    const limit = getArticlesPageLimit(getState())
    
    try {
        const response = await extra.api.get<Article[]>('/articles', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
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
