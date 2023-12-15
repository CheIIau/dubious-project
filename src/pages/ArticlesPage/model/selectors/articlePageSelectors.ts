import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'
import {
    ARTICLE_SORT_FIELD,
    ARTICLE_TYPE,
} from 'src/entities/Article/articleIndex'

export const getArticlesPageLimit = (state: StateSchema) =>
    state.articlesPage?.limit || 9

export const getArticlesPageOrder = (state: StateSchema) =>
    state.articlesPage?.order || 'asc'

export const getArticlesPageSort = (state: StateSchema) =>
    state.articlesPage?.sort || ARTICLE_SORT_FIELD.createdAt

export const getArticlesPageSearch = (state: StateSchema) =>
    state.articlesPage?.search ?? ''

export const getArticlesPageType = (state: StateSchema) =>
    state.articlesPage?.type ?? ARTICLE_TYPE.ALL
