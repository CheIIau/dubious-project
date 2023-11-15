import type { Article } from './article'

export interface ArticleDetailsSchema {
    loading: boolean
    error: string | null
    data: Article | null
}
