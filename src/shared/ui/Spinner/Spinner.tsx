import { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/classNames/classNames'
import classes from './Spinner.module.scss'

interface SpinnerProps extends PropsWithChildren {
    className?: string
    color?: string
    size?: string
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
