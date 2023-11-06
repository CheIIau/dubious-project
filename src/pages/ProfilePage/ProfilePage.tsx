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

    useEffect(() => {
        dispatch(fetchProfileData())
    }, [dispatch])

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

    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <div
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
                />
            </div>
        </DynamicModuleLoader>
    )
}
export default ProfilePage
