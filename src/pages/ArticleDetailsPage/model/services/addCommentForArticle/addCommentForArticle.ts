import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { Comment } from 'src/entities/Comment/commentIndex'
import type { ServiceError } from 'src/shared/api/api'
import { fetchCommentsByArticleId } from '../fetchCommentsByArticle/fetchCommentsByArticle'

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>('addCommentForm/addCommentForArticle', async (text, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi
    try {
        const userId = getState().user.authData?.id
        const articleId = getState().articleDetails?.data?.id

        if (!userId || !text || !articleId) {
            return rejectWithValue('Missing some data')
        }

        const response = await extra.api.post<Comment>('/comments', {
            articleId,
            userId,
            text,
        })

        await dispatch(fetchCommentsByArticleId(articleId))

        return response.data
    } catch (e) {
        const error = e as ServiceError
        const message = error.response?.data.message || error.message
        return rejectWithValue(message)
    }
})
