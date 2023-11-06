import { classNames } from '../../../shared/lib/style/classNames'
import type { FC, PropsWithChildren } from 'react'
import { useCallback, useState } from 'react'
import classes from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from 'src/shared/ui/Button/Button'
import { LoginModal } from 'src/features/AuthByUsername/authByUsernameIndex'
import { userActions } from 'src/entities/User/userIndex'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/storeHooks'

interface NavbarProps extends PropsWithChildren {
    readonly className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const { t } = useTranslation()
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
        <div className={classNames(classes.navbar, {}, [className])}>
            {authData ? (
                <>
                    <Button
                        theme="clear-inverted"
                        onClick={onLogout}
                    >
                        {t('singOut')}
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        theme="clear-inverted"
                        onClick={onToggleModal}
                    >
                        {t('singIn')}
                    </Button>
                    <LoginModal
                        isOpen={authModal}
                        onClose={onToggleModal}
                    >
                        {t('singIn')}
                    </LoginModal>
                </>
            )}
        </div>
    )
}
