import type { EntityState } from '@reduxjs/toolkit'
import type { Comment } from 'src/entities/Comment/commentIndex'

export interface ArticleDetailsCommentSchema extends EntityState<Comment> {
    loading: boolean
    error: string | null
}
