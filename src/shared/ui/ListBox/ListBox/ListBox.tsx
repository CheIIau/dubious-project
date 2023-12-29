import type { ReactNode } from 'react'
import { type FC, type PropsWithChildren, Fragment } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ListBox.module.scss'
import { Listbox as HListBox } from '@headlessui/react'
import { Button } from 'src/shared/ui/Button/Button'
import type { DropdownDirection } from 'src/shared/types/ui'

interface ListBoxProps extends PropsWithChildren {
    readonly className?: string
    readonly items?: ListBoxItem[]
    readonly value?: string
    readonly defaultValue?: string
    readonly onChange?: <T extends string>(value: T) => void
    readonly readonly?: boolean
    readonly label?: string
    readonly direction?: DropdownDirection
}

export interface ListBoxItem {
    value: string
    content: ReactNode
    disabled?: boolean
}

export const ListBox: FC<ListBoxProps> = ({
    className,
    value,
    defaultValue,
    onChange,
    items,
    readonly,
    label,
    direction = 'bottom',
}) => {
    const optionsClasses = [classes[direction]]

    return (
        <div>
            {label && (
                <span
                    className={classNames('mr-2', {
                        [classes.readonly]: readonly,
                    })}
                >
                    {label + '>'}
                </span>
            )}

            <HListBox
                disabled={readonly}
                as={'div'}
                className={classNames(
                    classes['list-box'],
                    {
                        [classes.readonly]: readonly,
                    },
                    [className],
                )}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button
                    aria-disabled={readonly}
                    as={'div'}
                    className={classes.trigger}
                >
                    <Button disabled={readonly}>{value ?? defaultValue}</Button>
                </HListBox.Button>

                <HListBox.Options
                    className={classNames(classes.options, {}, optionsClasses)}
                >
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {({ active, selected, disabled }) => (
                                <li
                                    className={classNames(
                                        classes.item,
                                        {
                                            [classes.item_selected]: selected,
                                            [classes.item_active]: active,
                                            [classes.item_disabled]: disabled,
                                        },
                                        [],
                                    )}
                                >
                                    {item.content}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </div>
    )
}
