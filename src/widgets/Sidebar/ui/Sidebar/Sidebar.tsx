import { FC, PropsWithChildren, useState } from 'react'
import { classNames } from 'src/shared/lib/classNames/classNames'
import classes from './Sidebar.module.scss'
import { ThemeSwitcher } from 'src/widgets/ThemeSwitcher/themeSwitcherIndex'
import { LangSwitcher } from 'src/widgets/LangSwitcher/ui/LangSwitcher'

interface SidebarProps extends PropsWithChildren {
    className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
    const [collapsed, setCollapsed] = useState(false)

    const onToggle = () => {
        setCollapsed(!collapsed)
    }

    return (
        <div
            className={classNames(
                classes.sidebar,
                { [classes.collapsed]: collapsed },
                [className]
            )}
        >
            <button onClick={onToggle}>toggle</button>
            <div className={classes.switchers}>
                <ThemeSwitcher />
                <LangSwitcher className={classes.lang} />
            </div>
        </div>
    )
}
