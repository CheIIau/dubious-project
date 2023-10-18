import { classNames } from '../../../shared/lib/style/classNames'
import type { FC, PropsWithChildren } from 'react'
import { useCallback, useState } from 'react'
import classes from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from 'src/shared/ui/Button/Button'
import { LoginModal } from 'src/features/AuthByUsername/authByUsernameIndex'
import { useAppDispatch, useAppSelector } from 'src/app/providers/StoreProvider/config/store'
import { userActions } from 'src/entities/User/userIndex'

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
    }, [])

    const authData = useAppSelector((state) => state.user.authData)

    if (authData) {
        return (
            <div className={classNames(classes.navbar, {}, [className])}>
                <Button
                    theme="clear-inverted"
                    onClick={onLogout}
                >
                    {t('singOut')}
                </Button>
            </div>
        )
    }

    return (
        <div className={classNames(classes.navbar, {}, [className])}>
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
        </div>
    )
}
