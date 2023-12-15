import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './NotFoundPage.module.scss'
import { useTranslation } from 'react-i18next'
import { Page } from 'src/widgets/Page/Page'

interface NotFoundPageProps extends PropsWithChildren {
    readonly className?: string
}

const NotFoundPage: FC<NotFoundPageProps> = ({ className }) => {
    const { t } = useTranslation('translation')
    return (
        <Page className={classNames(classes['not-found-page'], {}, [className])}>
            {t('notFound')}
        </Page>
    )
}

export default NotFoundPage
