import type { ReactElement } from 'react'
import {
    useState,
    type FC,
    type ImgHTMLAttributes,
    type PropsWithChildren,
    useLayoutEffect,
} from 'react'

interface AppImageProps
    extends PropsWithChildren,
        ImgHTMLAttributes<HTMLImageElement> {
    readonly className?: string
    readonly loadingFallback?: ReactElement
    readonly errorFallback?: ReactElement
}

export const AppImage: FC<AppImageProps> = ({
    className,
    loadingFallback,
    src,
    alt,
    errorFallback,
    ...props
}) => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useLayoutEffect(() => {
        const img = new Image()
        img.src = src ?? ''
        img.onload = () => {
            setLoading(false)
        }
        img.onerror = () => {
            setLoading(false)
            setError(true)
        }
    }, [src])

    if (loading && loadingFallback) {
        return loadingFallback
    }

    if (error && errorFallback) {
        return errorFallback
    }

    return (
        <img
            className={className}
            src={src}
            alt={alt}
            {...props}
        ></img>
    )
}
