import { createAsyncThunk } from '@reduxjs/toolkit'
import type { ThunkConfig } from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { Comment } from 'src/entities/Comment/commentIndex'
import type { ServiceError } from 'src/shared/api/api'

export const fetchCommentsByArticleId = createAsyncThunk<
    Comment[],
    string,
    ThunkConfig<string>
>('articleDetails/fetchCommentsByArticleId', async (articleId, thunkApi) => {
    try {
        const response = await thunkApi.extra.api.get<Comment[]>(
            '/comments', {
                params: {
                    articleId,
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
