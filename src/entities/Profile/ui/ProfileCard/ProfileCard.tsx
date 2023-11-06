import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ProfileCard.module.scss'
import { TEXT_THEME, Text } from 'src/shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { Input } from 'src/shared/ui/Input/Input'
import type { Profile } from '../../model/types/profile'
import { Spinner } from 'src/shared/ui/Spinner/Spinner'

interface ProfileCardProps extends PropsWithChildren {
    readonly className?: string
    readonly data?: Profile | null
    readonly error?: string | null
    readonly loading?: boolean
    readonly readonly?: boolean
    readonly onChangeFirstname: (value?: string) => void
    readonly onChangeLastname: (value?: string) => void
}

export const ProfileCard: FC<ProfileCardProps> = ({
    className,
    data,
    loading,
    error,
    readonly,
    onChangeFirstname,
    onChangeLastname,
}) => {
    const { t } = useTranslation(['profile', 'translation'])

    if (loading) {
        return (
            <div
                className={classNames(classes['profile-card'], {}, [
                    className,
                    classes.loading,
                ])}
            >
                <Spinner />
            </div>
        )
    }

    if (error) {
        return (
            <div
                className={classNames(classes['profile-card'], {}, [
                    className,
                    classes.error,
                ])}
            >
                <Text
                    className="text-center"
                    theme={TEXT_THEME.error}
                    title={error || t('translation:error')}
                    text={t('translation:tryToRefreshThePage')}
                />
            </div>
        )
    }

    return (
        <div className={classNames(classes['profile-card'], {}, [className])}>
            <Input
                value={data?.firstname}
                placeholder={t('profile:yourFirstname')}
                onChange={onChangeFirstname}
                className={'mb-3'}
                readonly={readonly}
            />
            <Input
                value={data?.lastname}
                placeholder={t('profile:yourLastname')}
                onChange={onChangeLastname}
                readonly={readonly}
            />
        </div>
    )
}
