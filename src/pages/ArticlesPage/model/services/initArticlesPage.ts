import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'src/app/providers/StoreProvider/storeProviderIndex'
import { fetchArticlesList } from './fetchArticlesList'
import { articlesPageActions } from '../slices/articlesPageSlice'

export const initArticlesPage = createAsyncThunk<
    Promise<void>,
    undefined,
    ThunkConfig<string>
>('articlesPage/initArticlesPage', async (_, thunkApi) => {
    const { dispatch, getState } = thunkApi
    const articlesInited = getState().articlesPage?._inited
    if (articlesInited) {
        return
    }
    dispatch(articlesPageActions.initState())
    dispatch(
        fetchArticlesList({
            page: 1,
        }),
    )
})
