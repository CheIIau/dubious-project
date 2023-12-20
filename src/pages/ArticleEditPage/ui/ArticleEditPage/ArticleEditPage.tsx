import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ArticleEditPage.module.scss'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface ArticleEditPageProps extends PropsWithChildren {
    readonly className?: string
}

const ArticleEditPage: FC<ArticleEditPageProps> = ({ className }) => {
    const { t } = useTranslation('article')
    const { id } = useParams<{ id: string }>()
    const isEdit = !!id

    return (
        <div className={classNames('', {}, [className])}>
            {isEdit ? t('editArticle') : t('createArticle')}
        </div>
    )
}

export default ArticleEditPage
