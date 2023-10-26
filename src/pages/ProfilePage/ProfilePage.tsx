import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ProfilePage.module.scss'

interface ProfilePageProps extends PropsWithChildren {
     readonly className?: string
}

const ProfilePage: FC<ProfilePageProps> = ({className}) => {
    return (
        <div className={classNames(classes['profile-page'], {}, [className])}>
        
        </div>
    )
}
export default ProfilePage