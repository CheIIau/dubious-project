import { RouterPaths } from 'src/app/providers/router/lib/router'
import { classNames } from '../../../shared/lib/style/classNames'
import { FC, PropsWithChildren } from 'react'
import classes from './Navbar.module.scss'
import { AppLink, appLinkTheme } from 'src/shared/ui/AppLink/AppLink'
import { useTranslation } from 'react-i18next'

interface NavbarProps extends PropsWithChildren {
    className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const { t } = useTranslation(['about', 'main'])
    return (
        <div className={classNames(classes.navbar, {}, [className])}>
            <div className={classes.links}>
                <AppLink
                    theme={appLinkTheme.primary}
                    to={RouterPaths.main}
                    className={classes['main-link']}
                >
                    {t('main:mainPage')}
                </AppLink>
                <AppLink
                    theme={appLinkTheme.secondary}
                    to={RouterPaths.about}
                >
                    {t('about:aboutPage')}
                </AppLink>
            </div>
        </div>
    )
}
