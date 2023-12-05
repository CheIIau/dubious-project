import type { FC, PropsWithChildren } from 'react'
import { classNames } from 'src/shared/lib/style/classNames'
import classes from './ErrorPage.module.scss'
import { useTranslation } from 'react-i18next'
import { Button } from 'src/shared/ui/Button/Button'
import { Page } from 'src/shared/ui/Page/Page'

interface ErrorPageProps extends PropsWithChildren {
    readonly className?: string
}

const ErrorPage: FC<ErrorPageProps> = ({ className }) => {
    const { t } = useTranslation()

    const reloadPage = () => {
        location.reload()
    }

    return (
        <Page className={classNames(classes['error-page'], {}, [className])}>
            <p className={classes['error-page__text']}>{t('error')}</p>
            <Button
                className={classes['error-page__refresh-button']}
                onClick={reloadPage}
            >
                {t('refresh')}
            </Button>
        </Page>
    )
}

export default ErrorPage
