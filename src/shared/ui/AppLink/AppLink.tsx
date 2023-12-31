import { forwardRef, type PropsWithChildren } from 'react'
import type { LinkProps } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './AppLink.module.scss'

export const appLinkTheme = {
    primary: 'primary',
    secondary: 'secondary',
} as const

interface AppLinkProps extends LinkProps, PropsWithChildren {
    readonly className?: string
    readonly theme?: keyof typeof appLinkTheme
}
export type Ref = HTMLAnchorElement

export const AppLink = forwardRef<Ref, AppLinkProps>(
    function AppLink(props, ref) {
        const { children, className, to, theme, ...otherProps } = props
        return (
            <NavLink
                to={to}
                ref={ref}
                className={classNames(classes.applink, {}, [
                    className,
                    classes[theme!],
                ])}
                {...otherProps}
            >
                {children}
            </NavLink>
        )
    },
)
