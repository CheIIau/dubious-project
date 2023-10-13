import { useTranslation } from 'react-i18next'
import { Counter } from 'src/entities/Counter/counderIndex'

const MainPage = () => {
    const { t } = useTranslation('main')
    return (
        <div>
            {t('mainPage')}
            <Counter />
        </div>
    )
}

export default MainPage
