import type { FC, HTMLAttributes, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Card.module.scss'

export enum CardTheme {
    NORMAL = 'normal',
    OUTLINE = 'outline',
}

interface CardProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
    readonly className?: string
    readonly theme?: CardTheme
}

export const Card: FC<CardProps> = ({
    className,
    children,
    theme = CardTheme.NORMAL,
    ...otherProps
}) => {
    return (
        <div
            className={classNames(classes.card, {}, [className, classes[theme]])}
            {...otherProps}
        >
            {children}
        </div>
    )
}
