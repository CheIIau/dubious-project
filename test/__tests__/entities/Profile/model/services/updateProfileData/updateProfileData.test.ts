import type {
    Profile,
    ValidateProfileErrorKeyType,
} from 'src/entities/Profile/profileIndex'
import { updateProfileData } from 'src/entities/Profile/profileIndex'
import { MockAsyncThunk } from 'test/helpers/mockAsyncThunk'

const ERROR_MESSAGE = 'error' as const

vi.mock(
    'src/entities/Profile/model/services/validateProfileData/validateProfileData',
    () => ({
        validateProfileData: vi.fn((profile: Profile) => {
            if (!profile.age) {
                return [ERROR_MESSAGE]
            }
            return []
        }),
    }),
)

describe('updateProfileData', () => {
    const USER_DATA = {
        id: '1',
        firstname: 'John',
        lastname: 'Doe',
        age: 31,
        currency: 'USD',
        country: 'Ukraine',
        city: 'Moscow',
        username: 'admin',
        avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
    } as const

    let thunk: MockAsyncThunk<
        Profile,
        string,
        string | ValidateProfileErrorKeyType[]
    >

    describe('positive scenario', () => {
        beforeEach(() => {
            thunk = new MockAsyncThunk(updateProfileData, {
                profile: { form: USER_DATA },
            })
            thunk.api.put.mockReturnValue(Promise.resolve({ data: USER_DATA }))
        })

        it('makes put request', async () => {
            await import(
                'src/entities/Profile/model/services/validateProfileData/validateProfileData'
            )
            await thunk.callThunk(USER_DATA.id)

            expect(thunk.api.put).toHaveBeenCalled()
        })

        it('sets request status to fulfilled', async () => {
            const result = await thunk.callThunk(USER_DATA.id)

            expect(result.meta.requestStatus).toBe('fulfilled')
        })

        it('calls dispatch 2 times', async () => {
            await thunk.callThunk(USER_DATA.id)

            expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        })

        it('returns user data', async () => {
            const result = await thunk.callThunk(USER_DATA.id)
            expect(result.payload).toEqual(USER_DATA)
        })
    })

    describe('when there is validation error', () => {
        beforeEach(() => {
            thunk = new MockAsyncThunk(updateProfileData, {
                profile: { form: {} },
            })
            thunk.api.put.mockReturnValue(Promise.resolve({ data: USER_DATA }))
        })

        it('sets request status to rejected', async () => {
            const result = await thunk.callThunk(USER_DATA.id)

            expect(result.meta.requestStatus).toBe('rejected')
        })

        it('returns error message', async () => {
            const result = await thunk.callThunk(USER_DATA.id)

            expect(result.payload).toEqual([ERROR_MESSAGE])
        })
    })

    describe('when server return 403 error', () => {
        beforeEach(() => {
            thunk = new MockAsyncThunk(updateProfileData, {
                profile: { form: USER_DATA },
            })
            thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }))
        })

        it('sets request status to rejected', async () => {
            const result = await thunk.callThunk(USER_DATA.id)

            expect(result.meta.requestStatus).toBe('rejected')
        })
    })
})
