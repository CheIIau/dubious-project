import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'

export const getLoginState = (state: StateSchema) => state.loginForm
