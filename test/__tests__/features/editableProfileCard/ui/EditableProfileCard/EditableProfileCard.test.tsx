import { fireEvent, render, screen } from '@testing-library/react'
import type { ProfileCardProps } from 'src/entities/Profile/ui/ProfileCard/ProfileCard'
import { type Profile } from 'src/entities/Profile/profileIndex'
import { profileReducer } from 'src/features/editableProfileCard/model/slice/profileSlice'
import { EditableProfileCard } from 'src/features/editableProfileCard/ui/EditableProfileCard/EditableProfileCard'
import { renderWrapper } from 'test/helpers/renderWrapper'
import { VALIDATE_PROFILE_ERROR_MESSAGES_KEYS } from 'src/features/editableProfileCard/model/const/const'

//мокнул thunk, можно было диспатч
const mockedFetchedProfileData = vi.fn()
vi.mock(
    'src/features/editableProfileCard/model/services/fetchProfileData/fetchProfileData',
    () => {
        const fetchProfileData = () => mockedFetchedProfileData
        Object.assign(fetchProfileData, {
            pending: {
                match: () => false,
            },
            rejected: {
                match: () => false,
            },
            fulfilled: {
                match: () => false,
            },
        })
        return {
            fetchProfileData,
        }
    },
)

const mockedProfileCard = vi.fn()
vi.mock('src/entities/Profile/ui/ProfileCard/ProfileCard', () => ({
    ProfileCard: (props: ProfileCardProps) => {
        mockedProfileCard(props)
        //@ts-expect-error
        return <mocked-profile-card />
    },
}))

describe('EditableProfileCard', () => {
    const USER_DATA = {
        firstname: 'John',
        lastname: 'Doe',
        age: 31,
        currency: 'USD',
        country: 'Ukraine',
        city: 'Moscow',
        username: 'admin',
        avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
    } as const satisfies Profile

    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('calls fetchProfileData dispatch', () => {
        const renderResult = render(
            renderWrapper(<EditableProfileCard id="1" />, {
                initialState: {
                    profile: {
                        readonly: true,
                        data: USER_DATA,
                        form: USER_DATA,
                    },
                },
                asyncReducers: {
                    profile: profileReducer,
                },
            }),
        )

        expect(mockedFetchedProfileData).toHaveBeenCalledTimes(1)
    })

    it('passes correct props to ProfileCard component', () => {
        const renderResult = render(
            renderWrapper(<EditableProfileCard id="1" />, {
                initialState: {
                    profile: {
                        readonly: true,
                        data: USER_DATA,
                        form: USER_DATA,
                    },
                },
                asyncReducers: {
                    profile: profileReducer,
                },
            }),
        )

        expect(mockedProfileCard).toHaveBeenCalledWith(
            expect.objectContaining({
                data: USER_DATA,
                readonly: true,
            }),
        )
    })

    it('shows error messages if there are validate errors', () => {
        const INCORRECT_AGE_TEXT = 'Incorrect age'
        const renderResult = render(
            renderWrapper(<EditableProfileCard id="1" />, {
                initialState: {
                    profile: {
                        validateError: [],
                    },
                },
                asyncReducers: {
                    profile: profileReducer,
                },
            }),
        )
        expect(renderResult.container.innerHTML).not.toContain(
            INCORRECT_AGE_TEXT,
        )

        renderResult.rerender(
            renderWrapper(<EditableProfileCard id="1" />, {
                initialState: {
                    profile: {
                        validateError: [
                            VALIDATE_PROFILE_ERROR_MESSAGES_KEYS.incorrectAge,
                        ],
                    },
                },
                asyncReducers: {
                    profile: profileReducer,
                },
            }),
        )

        expect(renderResult.container.innerHTML).toContain(INCORRECT_AGE_TEXT)
    })
})
// const asd = screen.getByTestId('firstname') as HTMLInputElement
// fireEvent.change(asd, {target: {value: ''}})
// console.log(asd.value)
