import type { FC, PropsWithChildren, ReactNode } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Popover.module.scss'
import { Popover as HPopover } from '@headlessui/react'
import type { DropdownDirection } from 'src/shared/types/ui'
import popupClasses from '../../styles/popup.module.scss'

interface PopoverProps extends PropsWithChildren {
    readonly className?: string
    readonly trigger: ReactNode
    readonly direction?: DropdownDirection
}

export const Popover: FC<PopoverProps> = ({
    className,
    children,
    trigger,
    direction = 'bottom',
}) => {
    const optionsClasses = [popupClasses[direction]]
    return (
        <HPopover
            className={classNames('', {}, [className, popupClasses.popup])}
        >
            <HPopover.Button
                as={'div'}
                className={popupClasses.trigger}
            >
                {trigger}
            </HPopover.Button>

            <HPopover.Panel
                className={classNames(classes.panel, {}, optionsClasses)}
            >
                {children}
            </HPopover.Panel>
        </HPopover>
    )
}
