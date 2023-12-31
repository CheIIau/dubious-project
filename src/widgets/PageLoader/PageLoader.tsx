import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './PageLoader.module.scss'
import { Spinner } from 'src/shared/ui/Spinner/Spinner'

interface PageLoaderProps extends PropsWithChildren {
    readonly className?: string
}

export const PageLoader: FC<PageLoaderProps> = ({ className }) => {
    return (
        <div className={classNames(classes['page-loader'], {}, [className])}>
            <Spinner size='100px' />
        </div>
    )
}