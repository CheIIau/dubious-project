import type { FC, PropsWithChildren, ReactElement } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './SidebarItem.module.scss'
import type { appLinkTheme } from 'src/shared/ui/AppLink/AppLink'
import { AppLink } from 'src/shared/ui/AppLink/AppLink'
import type { RouterPaths } from 'src/app/providers/router/routerIndex'
import { useTranslation } from 'react-i18next'
import type i18next from 'i18next'

export interface SidebarItemProps extends PropsWithChildren {
    readonly path: (typeof RouterPaths)[keyof typeof RouterPaths]
    readonly text?: Exclude<
        Parameters<typeof i18next.t>[0],
        string | string[] | TemplateStringsArray
    >[number]
    readonly icon?: ReactElement
    readonly theme?: keyof typeof appLinkTheme
    readonly collapsed?: boolean
}

export const SidebarItem: FC<SidebarItemProps> = ({
    path,
    text,
    icon,
    theme = 'primary',
    collapsed = false,
}) => {
    const { t } = useTranslation()
    return (
        <AppLink
            theme={theme}
            to={path}
            className={classes['sidebar-item']}
        >
            {icon}
            {text && (
                <span
                    className={classNames(classes['sidebar-item__text'], {
                        [classes['sidebar-item__text_collapsed']]: collapsed,
                    })}
                >
                    {t(text as any)}
                </span>
            )}
        </AppLink>
    )
}
