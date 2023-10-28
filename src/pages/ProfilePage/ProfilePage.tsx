import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ProfilePage.module.scss'
import type { ReducersList } from 'src/shared/lib/components/DynamicModuleLoader'
import { DynamicModuleLoader } from 'src/shared/lib/components/DynamicModuleLoader'
import { profileReducer } from 'src/entities/Profile/profileIndex'
import { useTranslation } from 'react-i18next'

interface ProfilePageProps extends PropsWithChildren {
    readonly className?: string
}

const reducers: ReducersList = {
    profile: profileReducer,
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
    const { t } = useTranslation()
    return (
        <DynamicModuleLoader
            reducers={reducers}
            removeAfterUnmount
        >
            <div
                className={classNames(classes['profile-page'], {}, [className])}
            >
                {t('profile')}
            </div>
        </DynamicModuleLoader>
    )
}
export default ProfilePage
