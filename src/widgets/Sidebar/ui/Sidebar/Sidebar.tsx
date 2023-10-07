import { FC, PropsWithChildren, useState } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Sidebar.module.scss'
import { ThemeSwitcher } from 'src/widgets/ThemeSwitcher/themeSwitcherIndex'
import { LangSwitcher } from 'src/widgets/LangSwitcher/ui/LangSwitcher'
import MenuIcon from 'src/shared/assets/icons/menu.svg?react'
import { Button, THEME_BUTTON } from 'src/shared/ui/Button/Button'
import { fillIcon } from 'src/shared/lib/style/icons'
import { useTheme } from 'src/app/providers/ThemeProvider/themeProviderIndex'

interface SidebarProps extends PropsWithChildren {
    className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
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
                theme={THEME_BUTTON.clear}
                onClick={onToggle}
            >
                <MenuIcon fill={fillIcon(theme)} />
            </Button>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={classes.lang} />
            </div>
        </div>
    )
}
