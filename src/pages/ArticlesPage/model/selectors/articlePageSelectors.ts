import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'

export const getArticlesPageLimit = (state: StateSchema) =>
    state.articlesPage?.limit || 9
