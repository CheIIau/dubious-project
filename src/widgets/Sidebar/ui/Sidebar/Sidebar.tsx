import type { FC, PropsWithChildren } from 'react'
import { useMemo, useState } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Sidebar.module.scss'
import { ThemeSwitcher } from 'src/widgets/ThemeSwitcher/themeSwitcherIndex'
import { LangSwitcher } from 'src/widgets/LangSwitcher/ui/LangSwitcher'
import { Button } from 'src/shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'
import { SidebarItem } from './SidebarItem/SidebarItem'
import { sidebarItemsList } from '../../model/sidebarItemList'

import MenuIcon from 'src/shared/assets/icons/menu.svg?react'
interface SidebarProps extends PropsWithChildren {
    readonly className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
    const { t } = useTranslation(['about', 'main', 'translation'])
    const [collapsed, setCollapsed] = useState(true)

    const onToggle = () => {
        setCollapsed(!collapsed)
    }

    const itemsList = useMemo(() => {
        return sidebarItemsList.map((item) => (
            <SidebarItem
                {...item}
                key={item.path}
                collapsed={collapsed}
            />
        ))
    }, [collapsed])

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
                {itemsList}
            </div>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>
        </div>
    )
}
