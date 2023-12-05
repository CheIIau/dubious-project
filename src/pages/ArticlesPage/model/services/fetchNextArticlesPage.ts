import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'src/app/providers/StoreProvider/storeProviderIndex'
import { fetchArticlesList } from './fetchArticlesList'
import { articlesPageActions } from '../slices/articlesPageSlice'

export const fetchNextArtclesPage = createAsyncThunk<
    Promise<void>,
    undefined,
    ThunkConfig<string>
>('articlesPage/fetchNextArtclesPage', async (_, thunkApi) => {
    const { dispatch, getState } = thunkApi
    const hasMore = getState().articlesPage?.hasMore
    const page = getState().articlesPage?.page
    const loading = getState().articlesPage?.loading
    
    if (hasMore && !loading) {
        const nextPage = (page || 1) + 1
        dispatch(
            fetchArticlesList({
                page: nextPage,
            }),
        )
        dispatch(articlesPageActions.setPage(nextPage))
    }
})
