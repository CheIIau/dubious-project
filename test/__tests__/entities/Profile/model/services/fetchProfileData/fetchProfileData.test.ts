import type { Profile } from 'src/entities/Profile/profileIndex'
import { fetchProfileData } from 'src/entities/Profile/profileIndex'
import { MockAsyncThunk } from 'test/helpers/mockAsyncThunk'

describe('fetchProfileData', () => {
    const USER_DATA = {
        firstname: 'John',
        lastname: 'Doe',
        age: 31,
        currency: 'USD',
        country: 'Ukraine',
        city: 'Moscow',
        username: 'admin',
        avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
    }
    let thunk: MockAsyncThunk<Profile, undefined, string>

    describe('positive scenario', () => {
        beforeEach(() => {
            thunk = new MockAsyncThunk(fetchProfileData)
            thunk.api.get.mockReturnValue(Promise.resolve({ data: USER_DATA }))
        })

        it('makes get request', async () => {
            await thunk.callThunk()

            expect(thunk.api.get).toHaveBeenCalled()
        })

        it('sets request status to fulfilled', async () => {
            const result = await thunk.callThunk()

            expect(result.meta.requestStatus).toBe('fulfilled')
        })

        it('calls dispatch 2 times', async () => {
            await thunk.callThunk()

            expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        })

        it('returns user data', async () => {
            const result = await thunk.callThunk()

            expect(result.payload).toEqual(USER_DATA)
        })
    })

    describe('when server returns 403 error', () => {
        beforeEach(() => {
            thunk = new MockAsyncThunk(fetchProfileData)
            thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }))
        })

        it('sets request status to rejected', async () => {
            const result = await thunk.callThunk()
            
            expect(result.meta.requestStatus).toBe('rejected')
        })
    })
})
