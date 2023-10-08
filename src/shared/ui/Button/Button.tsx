import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Button.module.scss'

interface ButtonProps
    extends PropsWithChildren,
        ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    theme?: keyof typeof BUTTON_THEME
    square?: boolean
    size?: keyof typeof BUTTON_SIZE
}

export const BUTTON_THEME = {
    clear: 'clear',
    outline: 'outline',
    background: 'background',
    ['background-inverted']: 'background-inverted',
} as const

export const BUTTON_SIZE = {
    m: 'size_m',
    l: 'size_l',
    xl: 'size_xl',
} as const

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children,
        theme,
        size = 'm',
        square,
        ...otherProps
    } = props

    const mods: Record<string, boolean> = {
        [classes.square]: !!square,
    }

    const additional = [
        className,
        classes[BUTTON_THEME[theme!]],
        classes[BUTTON_SIZE[size]],
    ]

    return (
        <button
            className={classNames(classes.button, mods, additional)}
            {...otherProps}
        >
            {children}
        </button>
    )
}
