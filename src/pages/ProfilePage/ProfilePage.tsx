import { type FC, type PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ProfilePage.module.scss'
import { Page } from 'src/widgets/Page/Page'
import { EditableProfileCard } from 'src/features/editableProfileCard/editableProfileCardIndex'
import { useParams } from 'react-router-dom'
import { EditableProfileCardHeader } from 'src/features/editableProfileCard/editableProfileCardIndex'

interface ProfilePageProps extends PropsWithChildren {
    readonly className?: string
}

const ProfilePage: FC<ProfilePageProps> = ({ className }) => {
    const { id } = useParams<{ id: string }>()
    return (
        <Page className={classNames(classes['profile-page'], {}, [className])}>
            <EditableProfileCardHeader className="mb-3" />
            <EditableProfileCard id={id} />
        </Page>
    )
}
export default ProfilePage
