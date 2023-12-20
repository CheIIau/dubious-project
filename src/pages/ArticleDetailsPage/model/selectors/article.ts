import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'

export const getCanEditArticle = (state: StateSchema) => {
    const article = state.articleDetails?.data
    const userData = state.user.authData

    if (!article || !userData) {
        return false
    }

    return article.user.id === userData.id
}
