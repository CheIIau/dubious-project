import { Suspense, lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { counterReducer } from 'src/entities/Counter/counderIndex'
import type { ReducersList } from 'src/shared/lib/components/DynamicModuleLoader'
import { DynamicModuleLoader } from 'src/shared/lib/components/DynamicModuleLoader'
import { Page } from 'src/shared/ui/Page/Page'
import { Spinner } from 'src/shared/ui/Spinner/Spinner'

const Counter = lazy(() => import('src/entities/Counter/counderIndex'))

const initialReducers: ReducersList = {
    counter: counterReducer,
}

const AboutPage = () => {
    const { t } = useTranslation('about')
    return (
        <Page>
            {t('aboutPage')}
            <DynamicModuleLoader reducers={initialReducers}>
                <Suspense fallback={<Spinner />}>
                    <Counter />
                </Suspense>
            </DynamicModuleLoader>
        </Page>
    )
}

export default AboutPage
