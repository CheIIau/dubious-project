import type { FC, PropsWithChildren} from 'react'
import { useState } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Sidebar.module.scss'
import { ThemeSwitcher } from 'src/widgets/ThemeSwitcher/themeSwitcherIndex'
import { LangSwitcher } from 'src/widgets/LangSwitcher/ui/LangSwitcher'
import { Button } from 'src/shared/ui/Button/Button'
import { AppLink, appLinkTheme } from 'src/shared/ui/AppLink/AppLink'
import { RouterPaths } from 'src/app/providers/router/lib/router'
import { useTranslation } from 'react-i18next'

import MenuIcon from 'src/shared/assets/icons/menu.svg?react'
import HomeIcon from 'src/shared/assets/icons/home.svg?react'
import AboutIcon from 'src/shared/assets/icons/doc.svg?react'

interface SidebarProps extends PropsWithChildren {
    readonly className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
    const { t } = useTranslation(['about', 'main', 'translation'])
    const [collapsed, setCollapsed] = useState(true)

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
                theme={'background-inverted'}
                onClick={onToggle}
            >
                <div className="flex flex-row justify-between px-2 w-full">
                    <p className="mr-4">{t('translation:hideSidebar')}</p>
                    <MenuIcon className="icon" />
                </div>
            </Button>
            <div className={classNames(classes.links, {}, ['mt-3'])}>
                <AppLink
                    theme={appLinkTheme.primary}
                    to={RouterPaths.main}
                    className={classes.link}
                >
                    <HomeIcon className="icon"  />
                    <span className={classNames(classes.link__text)}>{t('main:mainPage')}</span>
                </AppLink>
                <AppLink
                    theme={appLinkTheme.secondary}
                    to={RouterPaths.about}
                    className={classes.link}
                >
                    <AboutIcon className="icon"  />
                    <span className={classNames(classes.link__text)}>{t('about:aboutPage')}</span>
                </AppLink>
            </div>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>
        </div>
    )
}
