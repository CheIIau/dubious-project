import type { CSSProperties, ImgHTMLAttributes } from 'react'
import { useMemo, memo } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Avatar.module.scss'
import { AppImage } from '../AppImage/AppImage'
import UserIcon from 'src/shared/assets/icons/user.svg?react'
import { Skeleton } from '../Skeleton/Skeleton'

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
        <AppImage
            src={src}
            className={classNames(classes.avatar, {}, [className])}
            style={styles}
            errorFallback={
                <UserIcon
                    width={size}
                    height={size}
                    className={classes['fallback-icon-color']}
                />
            }
            loadingFallback={
                <Skeleton
                    width={size}
                    height={size}
                    border="50%"
                />
            }
            {...otherProps}
        ></AppImage>
    )
})
