import type { CSSProperties, FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Skeleton.module.scss'

interface SkeletonProps extends PropsWithChildren {
    readonly className?: string
    readonly height?: string | number
    readonly width?: string | number
    readonly border?: string
}

export const Skeleton: FC<SkeletonProps> = (props) => {
    const { height, className, width, border = '8px' } = props

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    }
    return (
        <div
            className={classNames(classes.skeleton, {}, [className])}
            style={styles}
        ></div>
    )
}
