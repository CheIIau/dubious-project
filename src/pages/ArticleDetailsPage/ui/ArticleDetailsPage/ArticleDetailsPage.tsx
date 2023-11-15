import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ArticleDetailsPage.module.scss'
import { useTranslation } from 'react-i18next'
import { ArticleDetails } from 'src/entities/Article/articleIndex'
import { useParams } from 'react-router-dom'

interface ArticleDetailsPageProps extends PropsWithChildren {
    readonly className?: string
}

const ArticleDetailsPage: FC<ArticleDetailsPageProps> = ({ className }) => {
    const { t } = useTranslation('article')
    const { id } = useParams<{ id: string }>()

    if (!id) {
        return (
            <div
                className={classNames(classes.articledetailspage, {}, [
                    className,
                ])}
            >
                {t('notFound')}
            </div>
        )
    }

    return (
        <div
            className={classNames(classes.articledetailspage, {}, [className])}
        >
            <ArticleDetails id={id} />
        </div>
    )
}

export default ArticleDetailsPage
