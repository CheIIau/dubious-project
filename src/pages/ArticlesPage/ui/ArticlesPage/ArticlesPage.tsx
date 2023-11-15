import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ArticlesPage.module.scss'

interface ArticlesPageProps extends PropsWithChildren {
    readonly className?: string
}

const ArticlesPage: FC<ArticlesPageProps> = ({ className }) => {
    return (
        <div
            className={classNames(classes.articlespage, {}, [className])}
        ></div>
    )
}

export default ArticlesPage
