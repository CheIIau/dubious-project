import { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './NotFoundPage.module.scss'
import { useTranslation } from 'react-i18next'

interface NotFoundPageProps extends PropsWithChildren {
    className?: string
}

const NotFoundPage: FC<NotFoundPageProps> = ({ className }) => {
    const { t } = useTranslation('translation')
    return (
        <div className={classNames(classes['not-found-page'], {}, [className])}>
            {t('notFound')}
        </div>
    )
}

export default NotFoundPage
