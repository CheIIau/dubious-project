import type { DeepPartial } from '@reduxjs/toolkit'
import type { LoginSchema } from 'src/features/AuthByUsername/authByUsernameIndex'
import { loginByUsername } from 'src/features/AuthByUsername/model/services/loginByUsername'
import {
    loginActions,
    loginReducer,
} from 'src/features/AuthByUsername/model/slice/loginSlice'

describe('loginSlice', () => {
    const USERNAME = 'user'
    const PASSWORD = '123'

    it('sets username', () => {
        const state: DeepPartial<LoginSchema> = { username: '' }

        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setUsername(USERNAME),
            ),
        ).toEqual({ username: USERNAME })
    })

    it('sets password', () => {
        const state: DeepPartial<LoginSchema> = { password: '' }

        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setPassword(PASSWORD),
            ),
        ).toEqual({ password: PASSWORD })
    })

    it('sets loading', () => {
        const state: DeepPartial<LoginSchema> = { loading: false }
        expect(
            loginReducer(state as LoginSchema, loginByUsername.pending),
        ).toEqual({ error: null, loading: true })
    })

    it('sets error', () => {
        const state: DeepPartial<LoginSchema> = { error: null, loading: true }
        const ERROR = 'error'

        expect(
            loginReducer(
                state as LoginSchema,
                loginByUsername.rejected(null, '', {} as any, ERROR)
            ),
        ).toEqual({ error: ERROR, loading: false })
    })
})
