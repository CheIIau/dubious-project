import { useTranslation } from 'react-i18next'
import { Page } from 'src/widgets/Page/Page'


const MainPage = () => {
    const { t } = useTranslation('main')
    return (
        <Page>
            {t('mainPage')}
        </Page>
    )
}

export default MainPage
