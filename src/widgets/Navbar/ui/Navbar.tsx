import { classNames } from '../../../shared/lib/style/classNames'
import type { FC, PropsWithChildren } from 'react'
import { useCallback, useState } from 'react'
import classes from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from 'src/shared/ui/Button/Button'
import { LoginModal } from 'src/features/AuthByUsername/authByUsernameIndex'
import { userActions } from 'src/entities/User/userIndex'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/storeHooks'
import { Text } from 'src/shared/ui/Text/Text'
import { AppLink } from 'src/shared/ui/AppLink/AppLink'
import { RouterPaths } from 'src/app/providers/router/routerIndex'
import { Dropdown } from 'src/shared/ui/Dropdown/Dropdown/Dropdown'
import { Avatar } from 'src/shared/ui/Avatar/Avatar'

interface NavbarProps extends PropsWithChildren {
    readonly className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const { t } = useTranslation(['translation', 'article', 'profile'])
    const [authModal, setAuthModal] = useState(false)
    const dispatch = useAppDispatch()

    const onToggleModal = useCallback(() => {
        setAuthModal((show) => !show)
    }, [])

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

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
                        <Dropdown
                            className="h-8"
                            direction="bottom-left"
                            items={[
                                {
                                    content: t('profile:profile'),
                                    href: RouterPaths.profile + authData.id,
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
