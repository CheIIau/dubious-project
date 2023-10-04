import { useTranslation } from 'react-i18next'

const NotFoundPage = () => {
    const { t } = useTranslation('translation')
    return <div>{t('notFound')}</div>
}

export default NotFoundPage
