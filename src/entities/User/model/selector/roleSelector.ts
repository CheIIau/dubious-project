import { createSelector } from '@reduxjs/toolkit'
import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'
import { USER_ROLE } from '../types/user'

const getUserRoles = (state: StateSchema) => state.user.authData?.roles

export const isUserAdmin = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(USER_ROLE.ADMIN)),
)
export const isUserManger = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(USER_ROLE.MANAGER)),
)
export const isRegularUser = createSelector(getUserRoles, (roles) =>
    Boolean(roles?.includes(USER_ROLE.USER)),
)
