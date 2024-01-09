import { fireEvent, render, screen } from '@testing-library/react'
import { type Profile } from 'src/entities/Profile/profileIndex'
import { renderWrapper } from 'test/helpers/renderWrapper'
import { EditableProfileCardHeader } from 'src/features/editableProfileCard/ui/EditableProfileCardHeader/EditableProfileCardHeader'
import {
    profileActions,
    profileReducer,
} from 'src/features/editableProfileCard/model/slice/profileSlice'
import type { Mock } from 'vitest'

interface ProfileSlice {
    profileReducer: typeof profileReducer
    profileActions: typeof profileActions
}

vi.mock(
    'src/features/editableProfileCard/model/slice/profileSlice',
    async (original: () => Promise<ProfileSlice>) => {
        const profileSlice = await original()
        const profileActions = {
            setReadonly: vi.fn(() => ({ type: 'setReadonly', payload: null })),
            cancelEdit: vi.fn(() => ({ type: 'cancelEdit', payload: null })),
        }

        return {
            ...profileSlice,
            profileActions,
        }
    },
)

const mockedUpdateProfileData = vi.fn()
vi.mock(
    'src/features/editableProfileCard/model/services/updateProfileData/updateProfileData',
    () => {
        const updateProfileData = () => mockedUpdateProfileData
        Object.assign(updateProfileData, {
            pending: {
                match: () => false,
                type: 'updateProfileData/pending',
            },
            rejected: {
                match: () => false,
                type: 'updateProfileData/rejected',
            },
            fulfilled: {
                match: () => false,
                type: 'updateProfileData/fulfilled',
            },
        })
        return {
            updateProfileData,
        }
    },
)

describe('EditableProfileCardHeader', () => {
    const USER_DATA = {
        firstname: 'John',
        lastname: 'Doe',
        age: 31,
        currency: 'USD',
        country: 'Ukraine',
        city: 'Moscow',
        username: 'admin',
        avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
        id: '1',
    } as const satisfies Profile

    const EDIT_BUTTON_TEST_ID = 'edit-button'
    const CANCEL_BUTTON_TEST_ID = 'cancel-button'
    const SAVE_BUTTON_TEST_ID = 'save-button'

    beforeEach(() => {
        mockedUpdateProfileData.mockClear()
        ;(profileActions.cancelEdit as unknown as Mock).mockClear()
        ;(profileActions.setReadonly as unknown as Mock).mockClear()
    })

    it('shows edit button when readonly is true', async () => {
        const renderResult = render(
            renderWrapper(<EditableProfileCardHeader />, {
                initialState: {
                    profile: {
                        data: USER_DATA,
                        readonly: false,
                    },
                    user: {
                        authData: USER_DATA,
                    },
                },
                asyncReducers: {
                    profile: profileReducer,
                },
            }),
        )
        expect(screen.queryByTestId(EDIT_BUTTON_TEST_ID)).toBe(null)

        renderResult.rerender(
            renderWrapper(<EditableProfileCardHeader />, {
                initialState: {
                    profile: {
                        data: USER_DATA,
                        readonly: true,
                    },
                    user: {
                        authData: USER_DATA,
                    },
                },
                asyncReducers: {
                    profile: profileReducer,
                },
            }),
        )

        expect(screen.getByTestId(EDIT_BUTTON_TEST_ID)).toBeDefined()
    })

    it('calls setReadonly action on edit button click', async () => {
        render(
            renderWrapper(<EditableProfileCardHeader />, {
                initialState: {
                    profile: {
                        data: USER_DATA,
                        readonly: true,
                    },
                    user: {
                        authData: USER_DATA,
                    },
                },
                asyncReducers: {
                    profile: profileReducer,
                },
            }),
        )
        const editButton = screen.getByTestId(EDIT_BUTTON_TEST_ID)
        expect(profileActions.setReadonly).not.toBeCalled()

        fireEvent.click(editButton)

        expect(profileActions.setReadonly).toBeCalledWith(false)
    })

    it('calls cancelEdit action on cancel button click', async () => {
        render(
            renderWrapper(<EditableProfileCardHeader />, {
                initialState: {
                    profile: {
                        data: USER_DATA,
                        readonly: false,
                    },
                    user: {
                        authData: USER_DATA,
                    },
                },
                asyncReducers: {
                    profile: profileReducer,
                },
            }),
        )
        const cancelButton = screen.getByTestId(CANCEL_BUTTON_TEST_ID)
        expect(profileActions.cancelEdit).not.toBeCalled()

        fireEvent.click(cancelButton)

        expect(profileActions.cancelEdit).toBeCalledTimes(1)
    })

    it('calls saveButton action on save button click', async () => {
        render(
            renderWrapper(<EditableProfileCardHeader />, {
                initialState: {
                    profile: {
                        data: USER_DATA,
                        readonly: false,
                    },
                    user: {
                        authData: USER_DATA,
                    },
                },
                asyncReducers: {
                    profile: profileReducer,
                },
            }),
        )
        const saveButton = screen.getByTestId(SAVE_BUTTON_TEST_ID)
        expect(mockedUpdateProfileData).not.toHaveBeenCalled()

        fireEvent.click(saveButton)

        expect(mockedUpdateProfileData).toBeCalledTimes(1)
    })

    it('does not show buttons if user id differs from profile id', async () => {
        render(
            renderWrapper(<EditableProfileCardHeader />, {
                initialState: {
                    profile: {
                        data: USER_DATA,
                        readonly: false,
                    },
                    user: {
                        authData: { id: '77' },
                    },
                },
                asyncReducers: {
                    profile: profileReducer,
                },
            }),
        )

        expect(screen.queryByTestId(EDIT_BUTTON_TEST_ID)).toBe(null)
        expect(screen.queryByTestId(CANCEL_BUTTON_TEST_ID)).toBe(null)
        expect(screen.queryByTestId(SAVE_BUTTON_TEST_ID)).toBe(null)
    })
})
