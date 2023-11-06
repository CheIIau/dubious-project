import { useCallback, type FC, type PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ProfilePageHeader.module.scss'
import { Text } from 'src/shared/ui/Text/Text'
import { Button, BUTTON_THEME } from 'src/shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { profileActions } from 'src/entities/Profile/profileIndex'

interface ProfilePageHeaderProps extends PropsWithChildren {
    readonly className?: string
}

export const ProfilePageHeader: FC<ProfilePageHeaderProps> = ({
    className,
}) => {
    const { t } = useTranslation(['translation', 'profile'])

    const readonly = useAppSelector((store) => store.profile?.readonly)

    const dispatch = useAppDispatch()
    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false))
    }, [])
    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(true))
    }, [])

    return (
        <div
            className={classNames(classes['profile-page-header'], {}, [
                className,
            ])}
        >
            <Text title={t('profile:profile')} />
            {readonly ? (
                <Button
                    theme={BUTTON_THEME.outline}
                    className="ml-auto"
                    onClick={onEdit}
                >
                    {t('profile:edit')}
                </Button>
            ) : (
                <Button
                    theme={BUTTON_THEME.outline}
                    className="ml-auto"
                    onClick={onCancelEdit}
                >
                    {t('cancel')}
                </Button>
            )}
        </div>
    )
}
