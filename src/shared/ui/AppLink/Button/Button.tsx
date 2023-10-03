import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/classNames/classNames'
import classes from './Button.module.scss'

interface ButtonProps
    extends PropsWithChildren,
        ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    theme?: keyof typeof THEME_BUTTON
}

export const THEME_BUTTON = {
    clear: 'clear',
} as const

export const Button: FC<ButtonProps> = (props) => {
    const { className, children, theme, ...otherProps } = props
    return (
        <button
            className={classNames(classes.button, {}, [className, classes[theme!]])}
            {...otherProps}
        >
            {children}
        </button>
    )
}
