import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './[FTName].module.scss'

interface [FTName]Props extends PropsWithChildren {
    readonly className?: string
}

export const [FTName]: FC<[FTName]Props> = ({className}) => {

    return (
        <div className={classNames(classes.[FTName], {}, [className])}>
            
        </div>
    )
}