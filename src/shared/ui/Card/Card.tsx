import type { FC, HTMLAttributes, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Card.module.scss'

interface CardProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
    readonly className?: string
}

export const Card: FC<CardProps> = ({ className, children, ...otherProps }) => {
    return (
        <div
            className={classNames(classes.card, {}, [className])}
            {...otherProps}
        >
            {children}
        </div>
    )
}
