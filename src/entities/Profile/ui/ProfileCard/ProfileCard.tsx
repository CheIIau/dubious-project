import { memo, type PropsWithChildren } from 'react'
import type { Mods } from 'src/shared/lib/style/classNames'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ProfileCard.module.scss'
import { TEXT_THEME, Text } from 'src/shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { Input } from 'src/shared/ui/Input/Input'
import type { Profile } from '../../model/types/profile'
import { Spinner } from 'src/shared/ui/Spinner/Spinner'
import { Avatar } from 'src/shared/ui/Avatar/Avatar'
import { CurrencySelect } from 'src/entities/Currency/indexCurrency'
import type { COUNTRIES, CURRENCIES } from 'src/shared/const/enums'
import { CountrySelect } from 'src/entities/Country/indexCurrency'

export interface ProfileCardProps extends PropsWithChildren {
    readonly className?: string
    readonly data?: Profile | null
    readonly error?: string | null
    readonly loading?: boolean
    readonly readonly?: boolean
    readonly onChangeFirstname?: (value?: string) => void
    readonly onChangeLastname?: (value?: string) => void
    readonly onChangeAge?: (value?: string) => void
    readonly onChangeCity?: (value?: string) => void
    readonly onChangeAvatar?: (value?: string) => void
    readonly onChangeUsername?: (value?: string) => void
    readonly onChangeCurrency?: (value?: keyof typeof CURRENCIES) => void
    readonly onChangeCountry?: (value?: keyof typeof COUNTRIES) => void
}

export const ProfileCard = memo<ProfileCardProps>(function ProfileCard(props) {
    const {
        className,
        data,
        loading,
        error,
        readonly,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    } = props
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

    const mods: Mods = {
        [classes.editable]: !readonly,
    }

    return (
        <div className={classNames(classes['profile-card'], mods, [className])}>
            {data?.avatar && (
                <div className={classes['avatar-wrapper']}>
                    <Avatar src={data.avatar} />
                </div>
            )}
            <Input
                value={data?.firstname ?? ''}
                placeholder={t('profile:yourFirstname')}
                onChange={onChangeFirstname}
                readonly={readonly}
                className="mb-3"
                data-testid="firstname"
                data-cy="firstname"
            />
            <Input
                value={data?.lastname ?? ''}
                placeholder={t('profile:yourLastname')}
                onChange={onChangeLastname}
                readonly={readonly}
                className="mb-3"
                data-testid="lastname"
            />
            <Input
                value={data?.age ? data.age + '' : ''}
                placeholder={t('profile:age')}
                onChange={onChangeAge}
                readonly={readonly}
                type="number"
                className="mb-3"
            />
            <Input
                value={data?.city ?? ''}
                placeholder={t('profile:city')}
                onChange={onChangeCity}
                readonly={readonly}
                className="mb-3"
            />
            <Input
                value={data?.username ?? ''}
                placeholder={t('profile:username')}
                onChange={onChangeUsername}
                readonly={readonly}
                className="mb-3"
            />
            <Input
                value={data?.avatar ?? ''}
                placeholder={t('profile:avatarLink')}
                onChange={onChangeAvatar}
                readonly={readonly}
                className="mb-3"
            />
            {/* Let there be different selects */}
            <CurrencySelect
                readonly={readonly}
                value={data?.currency}
                onChange={onChangeCurrency}
                className="mb-3"
            />
            <CountrySelect
                value={data?.country}
                onChange={onChangeCountry}
                readonly={readonly}
            />
        </div>
    )
})
