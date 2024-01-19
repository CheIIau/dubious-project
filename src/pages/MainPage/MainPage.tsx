import { useTranslation } from 'react-i18next'
import { Page } from 'src/widgets/Page/Page'

const MainPage = () => {
    const { t } = useTranslation('main')

    return (
        <Page>
            <span data-cy="main-page-text">{t('mainPage')}</span>
        </Page>
    )
}

export default MainPage
