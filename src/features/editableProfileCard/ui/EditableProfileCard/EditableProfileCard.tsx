import { useTranslation } from 'react-i18next'
import { memo, useCallback, useEffect, type PropsWithChildren } from 'react'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { ProfileCard } from 'src/entities/Profile/profileIndex'
import type { CURRENCIES, COUNTRIES } from 'src/shared/const/enums'
import { TEXT_THEME, Text } from 'src/shared/ui/Text/Text'
import { VALIDATE_PROFILE_ERROR_MESSAGES_KEYS } from '../../model/const/const'
import { getProfile } from '../../model/selectors/getProfile'
import { profileActions, profileReducer } from '../../model/slice/profileSlice'
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'
import {
    DynamicModuleLoader,
    type ReducersList,
} from 'src/shared/lib/components/DynamicModuleLoader'

interface EditableProfileCardProps extends PropsWithChildren {
    readonly className?: string
    readonly id: string | undefined
}

const reducers: ReducersList = {
    profile: profileReducer,
}

export const EditableProfileCard = memo<EditableProfileCardProps>(
    function EditableProfileCard({ className, id }) {
        const dispatch = useAppDispatch()
        //можно было бы убрать селектор полностью и возвращать из стейта объект, но сделал просто так
        const profile = useAppSelector(getProfile)

        const { t } = useTranslation('profile')

        const validateErrorTranslates = {
            [VALIDATE_PROFILE_ERROR_MESSAGES_KEYS.incorrectUserData]: t(
                VALIDATE_PROFILE_ERROR_MESSAGES_KEYS.incorrectUserData,
            ),
            [VALIDATE_PROFILE_ERROR_MESSAGES_KEYS.incorrectCity]: t(
                VALIDATE_PROFILE_ERROR_MESSAGES_KEYS.incorrectCity,
            ),
            [VALIDATE_PROFILE_ERROR_MESSAGES_KEYS.incorrectAge]: t(
                VALIDATE_PROFILE_ERROR_MESSAGES_KEYS.incorrectAge,
            ),
            [VALIDATE_PROFILE_ERROR_MESSAGES_KEYS.noData]: t(
                VALIDATE_PROFILE_ERROR_MESSAGES_KEYS.noData,
            ),
        }

        useEffect(() => {
            if (id) {
                dispatch(fetchProfileData(id))
            }
        }, [dispatch, id])

        const onChangeFirstname = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ firstname: value }))
            },
            [dispatch],
        )

        const onChangeLastname = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ lastname: value }))
            },
            [dispatch],
        )

        const onChangeAge = useCallback(
            (value?: string) => {
                if (value && +value > 0) {
                    return dispatch(
                        profileActions.updateProfile({
                            age: +value,
                        }),
                    )
                }
                dispatch(
                    profileActions.updateProfile({
                        age: undefined,
                    }),
                )
            },
            [dispatch],
        )

        const onChangeCity = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ city: value }))
            },
            [dispatch],
        )

        const onChangeAvatar = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ avatar: value }))
            },
            [dispatch],
        )

        const onChangeUsername = useCallback(
            (value?: string) => {
                dispatch(profileActions.updateProfile({ username: value }))
            },
            [dispatch],
        )

        const onChangeCurrency = useCallback(
            (value?: keyof typeof CURRENCIES) => {
                dispatch(profileActions.updateProfile({ currency: value }))
            },
            [dispatch],
        )

        const onChangeCountry = useCallback(
            (value?: keyof typeof COUNTRIES) => {
                dispatch(profileActions.updateProfile({ country: value }))
            },
            [dispatch],
        )

        return (
            <DynamicModuleLoader reducers={reducers}>
                <div className={className}>
                    <ProfileCard
                        data={profile?.form}
                        error={profile?.error}
                        loading={profile?.loading}
                        readonly={profile?.readonly}
                        onChangeFirstname={onChangeFirstname}
                        onChangeLastname={onChangeLastname}
                        onChangeCity={onChangeCity}
                        onChangeAge={onChangeAge}
                        onChangeAvatar={onChangeAvatar}
                        onChangeUsername={onChangeUsername}
                        onChangeCurrency={onChangeCurrency}
                        onChangeCountry={onChangeCountry}
                    />
                    {profile?.validateError?.length && (
                        <div
                            className="p-1 mt-2"
                        >
                            {profile.validateError.map((error) => (
                                <Text
                                    key={error}
                                    theme={TEXT_THEME.error}
                                    text={validateErrorTranslates[error]}
                                    className="mb-1"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </DynamicModuleLoader>
        )
    },
)
