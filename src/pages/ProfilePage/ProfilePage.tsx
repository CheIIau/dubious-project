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
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { ProfilePageHeader } from './ui/ProfilePageHeader/ProfilePageHeader'

interface ProfilePageProps extends PropsWithChildren {
    readonly className?: string
}

const reducers: ReducersList = {
    profile: profileReducer,
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
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

    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({ lastname: value }))
    }, [dispatch])

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
                    data={profile?.data}
                    error={profile?.error}
                    loading={profile?.loading}
                    readonly={profile?.readonly}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                />
            </div>
        </DynamicModuleLoader>
    )
}
export default ProfilePage
