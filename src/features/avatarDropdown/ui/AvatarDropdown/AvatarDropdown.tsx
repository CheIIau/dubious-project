import { type FC, type PropsWithChildren, useCallback } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import { Dropdown } from 'src/shared/ui/Popups/popupsIndex'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { isUserAdmin, userActions } from 'src/entities/User/userIndex'
import { useTranslation } from 'react-i18next'
import { RouterPaths } from 'src/app/providers/router/routerIndex'
import { Avatar } from 'src/shared/ui/Avatar/Avatar'

interface AvatarDropdownProps extends PropsWithChildren {
    readonly className?: string
}

export const AvatarDropdown: FC<AvatarDropdownProps> = ({ className }) => {
    const { t } = useTranslation(['translation', 'article', 'profile'])

    const dispatch = useAppDispatch()

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    const authData = useAppSelector((state) => state.user.authData)

    const isAdmin = useAppSelector(isUserAdmin)

    if (!authData) {
        return null
    }

    return (
        <Dropdown
            className={classNames('', {}, [className, 'h-8'])}
            direction="bottom-left"
            items={[
                ...(isAdmin
                    ? [
                          {
                              content: t('translation:adminPanel'),
                              href: RouterPaths.adminPanelPage,
                          },
                      ]
                    : []),
                {
                    content: t('profile:profile'),
                    href: RouterPaths.profile + '/' + authData.id,
                },
                {
                    content: t('translation:singOut'),
                    onClick: onLogout,
                },
            ]}
            trigger={
                <Avatar
                    size={30}
                    src={authData.avatar}
                />
            }
        />
    )
}
