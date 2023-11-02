import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import type { Mods} from 'src/shared/lib/style/classNames'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Button.module.scss'

interface ButtonProps
    extends PropsWithChildren,
        ButtonHTMLAttributes<HTMLButtonElement> {
    readonly className?: string
    readonly theme?: keyof typeof BUTTON_THEME
    readonly square?: boolean
    readonly size?: keyof typeof BUTTON_SIZE
    readonly disabled?: boolean
}

export const BUTTON_THEME = {
    clear: 'clear',
    ['clear-inverted']: 'clear-inverted',
    outline: 'outline',
    background: 'background',
    ['background-inverted']: 'background-inverted',
} as const

export const BUTTON_SIZE = {
    s: 'size_s',
    m: 'size_m',
    l: 'size_l',
    xl: 'size_xl',
} as const

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        theme,
        disabled,
        size = 'm',
        square,
        ...otherProps
    } = props

    const mods: Mods = {
        [classes.square]: !!square,
        [classes.disabled]: !!disabled,
    }

    const additional = [
        className,
        classes[BUTTON_THEME[theme!]],
        classes[BUTTON_SIZE[size]],
    ]

    return (
        <button
            className={classNames(classes.button, mods, additional)}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    )
}
