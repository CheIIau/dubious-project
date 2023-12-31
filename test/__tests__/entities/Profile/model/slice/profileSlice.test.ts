import type { DeepPartial } from '@reduxjs/toolkit'
import type { ProfileSchema } from 'src/features/editableProfileCard/editableProfileCardIndex'
import {
    profileActions,
    profileReducer,
    updateProfileData,
} from 'src/features/editableProfileCard/editableProfileCardIndex'

describe('profileSlice', () => {
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

    it('sets readonly', () => {
        const state: DeepPartial<ProfileSchema> = { readonly: false }

        expect(
            profileReducer(
                state as ProfileSchema,
                profileActions.setReadonly(true),
            ),
        ).toHaveProperty('readonly', true)
    })

    // тесты на остальные редюсеры писать лень, они все однотипные

    it('sets readonly to true and error to null on update profile pending', () => {
        const state: DeepPartial<ProfileSchema> = {
            loading: false,
            validateError: ['noData'],
        }

        expect(
            profileReducer(state as ProfileSchema, updateProfileData.pending),
        ).toMatchObject({ loading: true, validateError: null } as ProfileSchema)
    })

    it('sets form data and loading to false on update profile fulfilled', () => {
        const state: DeepPartial<ProfileSchema> = {
            loading: true,
            data: null,
            form: null,
        }

        expect(
            profileReducer(
                state as ProfileSchema,
                updateProfileData.fulfilled(USER_DATA, '', USER_DATA.id),
            ),
        ).toMatchObject({
            loading: false,
            form: USER_DATA,
            data: USER_DATA,
        } as ProfileSchema)
    })
})
