import type { FC, PropsWithChildren } from 'react'
import { useState } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Sidebar.module.scss'
import { ThemeSwitcher } from 'src/widgets/ThemeSwitcher/themeSwitcherIndex'
import { LangSwitcher } from 'src/widgets/LangSwitcher/ui/LangSwitcher'
import { Button } from 'src/shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { SidebarItem } from './SidebarItem/SidebarItem'

import MenuIcon from 'src/shared/assets/icons/menu.svg?react'
import { sidebarItemsList } from '../../model/sidebarItems'

interface SidebarProps extends PropsWithChildren {
    readonly className?: string
}

// export const sidebarItemsList: SidebarItemProps[] = [
//     {
//         path: RouterPaths.main,
//         theme: appLinkTheme.primary,
//         text: i18next.t('translation:enterPassword'),
//         icon: <HomeIcon className="icon" />,
//     },
//     {
//         path: RouterPaths.about,
//         theme: appLinkTheme.secondary,
//         text: i18next.t('about:aboutPage'),
//         icon: <AboutIcon className="icon" />,
//     },
// ]

export const Sidebar: FC<SidebarProps> = ({ className }) => {
    const { t } = useTranslation()
    const [collapsed, setCollapsed] = useState(false)

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
                    <p className="mr-4">{t('hideSidebar')}</p>
                    <MenuIcon className="icon" />
                </div>
            </Button>
            <div className={classNames(classes.links, {}, ['mt-3'])}>
                {sidebarItemsList.map((item) => (
                    <SidebarItem
                        {...item}
                        key={item.path}
                        collapsed={collapsed}
                    />
                ))}
                {/* <SidebarItem
                    path={RouterPaths.main}
                    icon={<HomeIcon className="icon" />}
                    text={t('mainPage')}
                    collapsed={collapsed}
                />
                <SidebarItem
                    path={RouterPaths.about}
                    icon={<AboutIcon className="icon" />}
                    text={t('mainPage')}
                    collapsed={collapsed}
                /> */}
            </div>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>
        </div>
    )
}
