import { FC, PropsWithChildren, useState } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Sidebar.module.scss'
import { ThemeSwitcher } from 'src/widgets/ThemeSwitcher/themeSwitcherIndex'
import { LangSwitcher } from 'src/widgets/LangSwitcher/ui/LangSwitcher'
import MenuIcon from 'src/shared/assets/icons/menu.svg?react'
import { Button, BUTTON_THEME } from 'src/shared/ui/Button/Button'
import { fillIcon } from 'src/shared/lib/style/icons'
import { useTheme } from 'src/app/providers/ThemeProvider/themeProviderIndex'
import { AppLink, appLinkTheme } from 'src/shared/ui/AppLink/AppLink'
import { RouterPaths } from 'src/app/providers/router/lib/router'
import { useTranslation } from 'react-i18next'
interface SidebarProps extends PropsWithChildren {
    className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
    const { t } = useTranslation(['about', 'main'])
    const [collapsed, setCollapsed] = useState(true)
    const { theme } = useTheme()

    const onToggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <div
            className={classNames(
                classes.sidebar,
                { [classes.collapsed]: collapsed },
                [className],
            )}
            data-testid="sidebar"
        >
            <Button
                data-testid="menu-button"
                className={classNames(classes['menu-button'])}
                theme={BUTTON_THEME['background-inverted']}
                onClick={onToggle}
            >
                <MenuIcon fill={fillIcon(theme)} />
            </Button>
            <div className={classNames(classes.links, {}, ['mt-7'])}>
                <AppLink
                    theme={appLinkTheme.primary}
                    to={RouterPaths.main}
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
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>
        </div>
    )
}
