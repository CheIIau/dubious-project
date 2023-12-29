import type { ReactNode } from 'react'
import { Fragment, type FC, type PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Dropdown.module.scss'
import { Menu } from '@headlessui/react'
import type { DropdownDirection } from 'src/shared/types/ui'
import { AppLink } from '../../AppLink/AppLink'

export interface DropdownItem {
    disabled?: boolean
    content?: ReactNode
    onClick?: () => void
    href?: string
}

interface DropdownProps extends PropsWithChildren {
    readonly className?: string
    readonly items?: DropdownItem[]
    readonly trigger: ReactNode
    readonly direction?: DropdownDirection
}

export const Dropdown: FC<DropdownProps> = ({
    className,
    trigger,
    items,
    direction = 'bottom',
}) => {
    const optionsClasses = [classes[direction]]
    return (
        <Menu
            as={'div'}
            className={classNames(classes.dropdown, {}, [className])}
        >
            <Menu.Button className={classes.button}>{trigger}</Menu.Button>
            <Menu.Items
                className={classNames(classes.menu, {}, optionsClasses)}
            >
                {items?.map((item) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            onClick={item.onClick}
                            disabled={item.disabled}
                            className={classNames(
                                classes.item,
                                { [classes.item_active]: active },
                                [],
                            )}
                        >
                            {item.content}
                        </button>
                    )

                    if (item.href) {
                        return (
                            <Menu.Item
                                key={item.href}
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                            >
                                {content}
                            </Menu.Item>
                        )
                    }
                    return (
                        <Menu.Item
                            key={item.href}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {content}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    )
}
