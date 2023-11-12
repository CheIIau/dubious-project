import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ArticleDetailsPage.module.scss'

interface ArticleDetailsPageProps extends PropsWithChildren {
     readonly className?: string
}

export const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({className}) => {
    return (
        <div className={classNames(classes.articledetailspage, {}, [className])}>
        
        </div>
    )
}