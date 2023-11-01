import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ProfileCard.module.scss'
import { useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { getProfile } from '../../model/selectors/getProfile'
import { Text } from 'src/shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { BUTTON_THEME, Button } from 'src/shared/ui/Button/Button'
import { Input } from 'src/shared/ui/Input/Input'
interface ProfileCardProps extends PropsWithChildren {
    readonly className?: string
}

export const ProfileCard: FC<ProfileCardProps> = ({ className }) => {
    const profile = useAppSelector(getProfile)
    const { t } = useTranslation('profile')
    return (
        <div className={classNames(classes['profile-card'], {}, [className])}>
            <div className={classes.header}>
                <Text title={t('profile')} />
                <Button
                    theme={BUTTON_THEME.outline}
                    className="ml-auto"
                >
                    {t('edit')}
                </Button>
            </div>
            <div className="mt-7">
                <Input
                    value={profile?.data?.firstname}
                    placeholder={t('yourFirstname')}
                    className={'mt-3'} 
                />
                <Input
                    value={profile?.data?.lastname}
                    placeholder={t('yourLastname')}
                    className={'mt-3'}
                />
            </div>
        </div>
    )
}
