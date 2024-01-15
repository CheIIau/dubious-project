import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'src/app/providers/StoreProvider/storeProviderIndex'
import { fetchArticlesList } from './fetchArticlesList'
import { articlesPageActions } from '../slices/articlesPageSlice'
import type { SortOrder } from 'src/shared/types/common'
import type {
    ARTICLE_SORT_FIELD,
    ARTICLE_TYPE,
} from 'src/entities/Article/articleIndex'

export const initArticlesPage = createAsyncThunk<
    Promise<void>,
    URLSearchParams,
    ThunkConfig<string>
>('articlesPage/initArticlesPage', async (searhParams, thunkApi) => {
    const { dispatch, getState } = thunkApi
    const articlesInited = getState().articlesPage?._inited
    if (articlesInited) {
        return
    }
    const orderFromUrl = searhParams.get('order') as SortOrder
    const sortFromUrl = searhParams.get(
        'sort',
    ) as keyof typeof ARTICLE_SORT_FIELD
    const searchFromUrl = searhParams.get('search')
    const typeFromUrl = searhParams.get('type') as keyof typeof ARTICLE_TYPE

    if (orderFromUrl) {
        dispatch(articlesPageActions.setOrder(orderFromUrl))
    }
    if (sortFromUrl) {
        dispatch(articlesPageActions.setSort(sortFromUrl))
    }
    if (searchFromUrl) {
        dispatch(articlesPageActions.setSearch(searchFromUrl))
    }
    if (typeFromUrl) {
        dispatch(articlesPageActions.setType(typeFromUrl))
    }

    dispatch(articlesPageActions.initState())
    dispatch(
        fetchArticlesList({
            page: 1,
        }),
    )
})
