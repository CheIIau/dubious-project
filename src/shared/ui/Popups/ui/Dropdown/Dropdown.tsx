import type { ReactNode } from 'react'
import { Fragment, type FC, type PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Dropdown.module.scss'
import popupClasses from '../../styles/popup.module.scss'
import { Menu } from '@headlessui/react'
import type { DropdownDirection } from 'src/shared/types/ui'
import { AppLink } from '../../../AppLink/AppLink'

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
    const optionsClasses = [popupClasses[direction]]
    return (
        <Menu
            as={'div'}
            className={classNames(popupClasses.popup, {}, [className])}
        >
            <Menu.Button className={popupClasses.trigger}>{trigger}</Menu.Button>
            <Menu.Items
                className={classNames(classes.menu, {}, optionsClasses)}
            >
                {items?.map((item, i) => {
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
                            key={i}
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
