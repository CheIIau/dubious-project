import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Text.module.scss'

export const TEXT_THEME = {
    primary: 'primary',
    error: 'error',
} as const

interface TextProps extends PropsWithChildren {
    readonly className?: string
    readonly title?: string | number
    readonly text?: string | number
    readonly theme?: keyof typeof TEXT_THEME
}

export const Text: FC<TextProps> = ({
    className,
    text,
    title,
    theme = TEXT_THEME.primary,
}) => {
    return (
        <div
            className={classNames(classes.text, {}, [
                className,
                classes[theme],
            ])}
        >
            {title && <p className={classes.title}>{title}</p>}
            {text && <p className={classes.text}>{text}</p>}
        </div>
    )
}
