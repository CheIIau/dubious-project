import { RouterPaths } from 'src/app/providers/router/lib/router'
import { classNames } from '../../../shared/lib/classNames/classNames'
import { FC, PropsWithChildren } from 'react'
import classes from './Navbar.module.scss'
import { AppLink, appLinkTheme } from 'src/shared/ui/AppLink/AppLink'

interface NavbarProps extends PropsWithChildren {
    className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    return (
        <div className={classNames(classes.navbar, {}, [className])}>
            <div className={classes.links}>
                <AppLink
                    theme={appLinkTheme.secondary}
                    to={RouterPaths.main}
                    className={classes.mainLink}
                >
                    Main
                </AppLink>
                <AppLink theme={appLinkTheme.secondary} to={RouterPaths.about}>
                    About
                </AppLink>
            </div>
        </div>
    )
}
