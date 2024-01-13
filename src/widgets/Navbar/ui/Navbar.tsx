import { classNames } from 'src/shared/lib/style/classNames'
import type { FC, PropsWithChildren } from 'react'
import { useCallback, useState } from 'react'
import classes from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from 'src/shared/ui/Button/Button'
import { LoginModal } from 'src/features/AuthByUsername/authByUsernameIndex'
import { useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { Text } from 'src/shared/ui/Text/Text'
import { AppLink } from 'src/shared/ui/AppLink/AppLink'
import { RouterPaths } from 'src/shared/const/routeList'
import { NotificationButton } from 'src/features/notificationButton/notificationButtonIndex'
import { AvatarDropdown } from 'src/features/avatarDropdown/avatarDropdownIndex'

interface NavbarProps extends PropsWithChildren {
    readonly className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const { t } = useTranslation(['translation', 'article', 'profile'])
    const [authModal, setAuthModal] = useState(false)

    const onToggleModal = useCallback(() => {
        setAuthModal((show) => !show)
    }, [])

    const authData = useAppSelector((state) => state.user.authData)

    return (
        <header className={classNames(classes.navbar, {}, [className])}>
            <AppLink to={RouterPaths.main}>
                <Text title="Dubious app" />
            </AppLink>

            <div className={classes['navbar-right']}>
                {authData ? (
                    <>
                        <AppLink
                            to={RouterPaths.articleCreate}
                            className="mr-2"
                        >
                            <Button theme="clear-inverted">
                                {t('article:createArticle')}
                            </Button>
                        </AppLink>
                        <div className="flex flex-row gap-2 items-center">
                            <NotificationButton />
                            <AvatarDropdown />
                        </div>
                    </>
                ) : (
                    <>
                        <Button
                            theme="clear-inverted"
                            onClick={onToggleModal}
                        >
                            {t('translation:singIn')}
                        </Button>
                        <LoginModal
                            isOpen={authModal}
                            onClose={onToggleModal}
                        >
                            {t('translation:singIn')}
                        </LoginModal>
                    </>
                )}
            </div>
        </header>
    )
}
