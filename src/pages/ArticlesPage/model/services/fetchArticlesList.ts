import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'src/app/providers/StoreProvider/storeProviderIndex'
import { ARTICLE_TYPE, type Article } from 'src/entities/Article/articleIndex'
import type { ServiceError } from 'src/shared/api/api'
import {
    getArticlesPageLimit,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
} from '../selectors/articlePageSelectors'
import { addQueryParams } from 'src/shared/lib/url/addQueryParams/addQueryParams'
interface fetchArticlesListProps {
    page?: number
    replace?: boolean
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    fetchArticlesListProps,
    ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (props, thunkApi) => {
    const { extra, getState, rejectWithValue } = thunkApi
    const { page = 1 } = props

    const limit = getArticlesPageLimit(getState())
    const order = getArticlesPageOrder(getState())
    const sort = getArticlesPageSort(getState())
    const search = getArticlesPageSearch(getState())
    const type = getArticlesPageType(getState())

    try {
        addQueryParams({
            sort,
            order,
            search,
            type,
        })
        const response = await extra.api.get<Article[]>('/articles', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
                _sort: sort,
                _order: order,
                type: type === ARTICLE_TYPE.ALL ? undefined : type,
                q: search,
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
