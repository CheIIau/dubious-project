import { FC, PropsWithChildren } from 'react'
import { LinkProps, NavLink } from 'react-router-dom'
import { classNames } from 'src/shared/lib/classNames/classNames'
import classes from './AppLink.module.scss'

export const appLinkTheme = {
    primary: 'primary',
    secondary: 'secondary'
} as const

interface AppLinkProps extends LinkProps, PropsWithChildren {
    className?: string
    theme?: keyof typeof appLinkTheme
}

export const AppLink: FC<AppLinkProps> = (props) => {
    const { children, className, to, theme, ...otherProps } = props
    return (
        <NavLink
            to={to}
            className={classNames(classes.applink, {}, [
                className,
                classes[theme!]
            ])}
            {...otherProps}
        >
            {children}
        </NavLink>
    )
}
