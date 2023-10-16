import { classNames } from '../../../shared/lib/style/classNames'
import type { FC, PropsWithChildren } from 'react'
import { useCallback, useState } from 'react'
import classes from './Navbar.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from 'src/shared/ui/Button/Button'
import { LoginModal } from 'src/features/AuthByUsername/authByUsernameIndex'

interface NavbarProps extends PropsWithChildren {
    readonly className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const { t } = useTranslation()
    const [authModal, setAuthModal] = useState(false)

    const onToggleModal = useCallback(() => {
        setAuthModal((show) => !show)
    }, [])

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
