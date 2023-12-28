import type { CSSProperties, FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './Flex.module.scss'

interface FlexProps extends PropsWithChildren {
    readonly className?: string
    readonly justify?: CSSProperties['justifyContent']
    readonly align?: CSSProperties['alignItems']
    readonly direction?: CSSProperties['flexDirection']
    readonly wrap?: CSSProperties['flexWrap']
}

export const Flex: FC<FlexProps> = ({
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    wrap = 'wrap'
}) => {
    return (
        <div
            style={{
                justifyContent: justify,
                alignItems: align,
                flexDirection: direction,
                flexWrap: wrap,
            }}
            className={classNames(classes.flex, {}, [className])}
        >
            {children}
        </div>
    )
}
