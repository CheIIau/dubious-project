import { memo, type PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Text.module.scss'

export const TEXT_THEME = {
    primary: 'primary',
    error: 'error',
} as const

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
type TextSize =
    | 'text-xs'
    | 'text-sm'
    | 'text-base'
    | 'text-lg'
    | 'text-xl'
    | 'text-2xl'
    | 'text-3xl'

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    'text-xs': 'h6',
    'text-sm': 'h5',
    'text-base': 'h4',
    'text-lg': 'h3',
    'text-xl': 'h2',
    'text-2xl': 'h1',
    'text-3xl': 'h1',
} as const
interface TextProps extends PropsWithChildren {
    readonly className?: string
    readonly titleClasses?: string
    readonly textClasses?: string
    readonly title?: string | number
    readonly text?: string | number
    readonly theme?: keyof typeof TEXT_THEME
}

export const Text = memo<TextProps>(function Text({
    className,
    textClasses,
    titleClasses,
    text,
    title,
    theme = TEXT_THEME.primary,
}) {
    let HeaderTitleTag: HeaderTagType

    if (titleClasses) {
        const titleSize = titleClasses
            .split(' ')
            .find((className) =>
                Object.keys(mapSizeToHeaderTag).includes(className),
            ) as TextSize | undefined
        if (titleSize) {
            HeaderTitleTag = mapSizeToHeaderTag[titleSize]
        } else {
            HeaderTitleTag = 'h6'
        }
    } else {
        HeaderTitleTag = 'h6'
    }

    return (
        <div
            className={classNames(classes.text, {}, [
                className,
                classes[theme],
            ])}
        >
            {title && (
                <HeaderTitleTag
                    className={classNames(classes.title, {}, [titleClasses])}
                >
                    {title}
                </HeaderTitleTag>
            )}
            {text && (
                <p className={classNames(classes.text, {}, [textClasses])}>
                    {text}
                </p>
            )}
        </div>
    )
})
