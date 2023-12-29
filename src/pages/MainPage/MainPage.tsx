import { useTranslation } from 'react-i18next'
import { Dropdown } from 'src/shared/ui/Dropdown/Dropdown/Dropdown'
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
