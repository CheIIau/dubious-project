import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'

export const getProfile = (state: StateSchema) => state.profile
export const getProfileForm = (state: StateSchema) => state.profile?.form
