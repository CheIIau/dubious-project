import type { CSSProperties, ImgHTMLAttributes } from 'react'
import { useMemo, memo } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Avatar.module.scss'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
    readonly className?: string
    readonly src: string
    readonly size?: number
}

export const Avatar = memo<AvatarProps>(function Avatar(props) {
    const { className, src, size, ...otherProps } = props

    const styles = useMemo<CSSProperties>(() => {
        return { width: size, height: size }
    }, [size])

    return (
        <img
            src={src}
            className={classNames(classes.avatar, {}, [className])}
            style={styles}
            {...otherProps}
        ></img>
    )
})
