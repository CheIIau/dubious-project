import { useEffect, type FC, type PropsWithChildren, useCallback } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ProfilePage.module.scss'
import type { ReducersList } from 'src/shared/lib/components/DynamicModuleLoader'
import { DynamicModuleLoader } from 'src/shared/lib/components/DynamicModuleLoader'
import {
    ProfileCard,
    fetchProfileData,
    getProfile,
    profileActions,
    profileReducer,
} from 'src/entities/Profile/profileIndex'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { ProfilePageHeader } from './ui/ProfilePageHeader/ProfilePageHeader'
import type { COUNTRIES, CURRENCIES } from 'src/shared/const/enums'
import { TEXT_THEME, Text } from 'src/shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { VALIDATE_PROFILE_ERROR_MESSAGES_KEYS } from 'src/entities/Profile/model/const/const'
import { useParams } from 'react-router-dom'
import { Page } from 'src/shared/ui/Page/Page'

interface ProfilePageProps extends PropsWithChildren {
    readonly className?: string
}

const reducers: ReducersList = {
    profile: profileReducer,
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
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

    const { id } = useParams<{ id: string }>()

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
        <DynamicModuleLoader
            reducers={reducers}
        >
            <Page
                className={classNames(classes['profile-page'], {}, [className])}
            >
                <ProfilePageHeader className="mb-3" />
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
                    <div className="p-1 mt-2">
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
            </Page>
        </DynamicModuleLoader>
    )
}
export default ProfilePage
