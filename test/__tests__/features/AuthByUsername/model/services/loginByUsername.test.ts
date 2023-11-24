import type { User } from 'src/entities/User/userIndex'
import { userActions } from 'src/entities/User/userIndex'
import type { LoginByUsernameProps } from 'src/features/AuthByUsername/authByUsernameIndex'
import { loginByUsername } from 'src/features/AuthByUsername/authByUsernameIndex'
import { MockAsyncThunk } from 'test/helpers/mockAsyncThunk'

describe('loginByUsername', () => {
    const USERNAME = 'user'
    const ID = '321'
    const PASSWORD = '111'
    const USER_DATA: User = { username: USERNAME, id: ID, avatar: 'asd' }
    let thunk: MockAsyncThunk<User, LoginByUsernameProps, string>

    describe('positive scenario', () => {
        // или можно мокнуть определенные запросы
        // mockedAxios.post.mockImplementation((url) => {
        //     switch (url) {
        //         case `${API_URL}/login`:
        //             return Promise.resolve({ data: USER_DATA })

        //         default:
        //             return Promise.resolve({ data: USER_DATA })
        //     }
        // })

        beforeEach(() => {
            thunk = new MockAsyncThunk(loginByUsername)
            thunk.api.post.mockReturnValue(Promise.resolve({ data: USER_DATA }))
        })

        it('calls dispatch function with initial data', async () => {
            await thunk.callThunk({
                username: USERNAME,
                password: PASSWORD,
            })

            expect(thunk.dispatch).toHaveBeenCalledWith(
                userActions.setAuthData(USER_DATA),
            )
        })

        it('makes post request', async () => {
            await thunk.callThunk({
                username: USERNAME,
                password: PASSWORD,
            })

            expect(thunk.api.post).toHaveBeenCalled()
        })

        it('sets request status to fulfilled', async () => {
            const result = await thunk.callThunk({
                username: USERNAME,
                password: PASSWORD,
            })

            expect(result.meta.requestStatus).toBe('fulfilled')
        })

        it('calls dispatch 3 times', async () => {
            await thunk.callThunk({
                username: USERNAME,
                password: PASSWORD,
            })

            expect(thunk.dispatch).toHaveBeenCalledTimes(3)
            //первый раз когда вызвали сам loginByUsername
            //второй в коде
            // третий когда return (fulfilled)
        })

        it('returns user data', async () => {
            const result = await thunk.callThunk({
                username: USERNAME,
                password: PASSWORD,
            })

            expect(result.payload).toEqual(USER_DATA)
        })
    })

    describe('when server returns 403 error', () => {
        beforeEach(() => {
            thunk = new MockAsyncThunk(loginByUsername)
            thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }))
        })

        it('not calls dispatch function', async () => {
            await thunk.callThunk({
                username: USERNAME,
                password: PASSWORD,
            })

            expect(thunk.dispatch).toHaveBeenCalledTimes(2)
            //первый раз когда вызвали сам loginByUsername
            //второй когда rejected
        })

        it('sets request status to rejected', async () => {
            const result = await thunk.callThunk({
                username: USERNAME,
                password: PASSWORD,
            })

            expect(result.meta.requestStatus).toBe('rejected')
        })
    })
})
