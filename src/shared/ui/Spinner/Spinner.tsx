import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Spinner.module.scss'

export interface SpinnerProps extends PropsWithChildren {
    readonly className?: string
    readonly color?: string
    readonly size?: string
}

export const Spinner: FC<SpinnerProps> = ({ className, color, size }) => {
    const spinnerColor = !color
        ? undefined
        : `${color} transparent transparent transparent`

    return (
        <div
            className={classNames(classes.spinner, {}, [className])}
            style={{ width: size, height: size }}
        >
            <div
                style={{ borderColor: spinnerColor, width: size, height: size }}
            />
            <div
                style={{ borderColor: spinnerColor, width: size, height: size }}
            />
            <div
                style={{ borderColor: spinnerColor, width: size, height: size }}
            />
            <div
                style={{ borderColor: spinnerColor, width: size, height: size }}
            />
        </div>
    )
}
