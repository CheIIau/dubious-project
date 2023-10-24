import axios from 'axios'
import { userActions } from 'src/entities/User/userIndex'
import { loginByUsername } from 'src/features/AuthByUsername/model/services/loginByUsername'
import { MockAsyncThunk } from 'test/helpers'

vi.mock('axios')

const mockedAxios = vi.mocked(axios, true)

describe('loginByUsername', () => {
    const USERNAME = 'user'
    const ID = '321'
    const PASSWORD = '111'
    const USER_DATA = { username: USERNAME, id: ID }
    // let dispatch: Dispatch
    // let getState: () => StateSchema

    // beforeEach(() => {
    //     dispatch = vi.fn()
    //     getState = vi.fn()
    // })

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

        beforeAll(() => {
            mockedAxios.post.mockReturnValue(
                Promise.resolve({ data: USER_DATA }),
            )
        })

        it('calls dispatch function with initial data', async () => {
            const thunk = new MockAsyncThunk(loginByUsername)

            await thunk.callThunk({
                username: USERNAME,
                password: PASSWORD,
            })

            expect(thunk.dispatch).toHaveBeenCalledWith(
                userActions.setAuthData(USER_DATA),
            )
        })

        it('makes post request', async () => {
            const thunk = new MockAsyncThunk(loginByUsername)

            await thunk.callThunk({
                username: USERNAME,
                password: PASSWORD,
            })

            expect(mockedAxios.post).toHaveBeenCalled()
        })

        it('sets request status to fulfilled', async () => {
            const thunk = new MockAsyncThunk(loginByUsername)

            const result = await thunk.callThunk({
                username: USERNAME,
                password: PASSWORD,
            })

            expect(result.meta.requestStatus).toBe('fulfilled')
        })

        it('calls dispatch 3 times', async () => {
            const thunk = new MockAsyncThunk(loginByUsername)

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
            const thunk = new MockAsyncThunk(loginByUsername)

            const result = await thunk.callThunk({
                username: USERNAME,
                password: PASSWORD,
            })

            expect(result.payload).toEqual(USER_DATA)
        })
    })

    describe('when server returns 403 error', () => {
        beforeAll(() => {
            mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
        })
        it('not calls dispatch function', async () => {
            const thunk = new MockAsyncThunk(loginByUsername)

            await thunk.callThunk({
                username: USERNAME,
                password: PASSWORD,
            })

            expect(thunk.dispatch).toHaveBeenCalledTimes(2)
            //первый раз когда вызвали сам loginByUsername
            //второй когда rejected
        })

        it('sets request status to rejected', async () => {
            const thunk = new MockAsyncThunk(loginByUsername)

            const result = await thunk.callThunk({
                username: USERNAME,
                password: PASSWORD,
            })

            expect(result.meta.requestStatus).toBe('rejected')
        })
    })
})
