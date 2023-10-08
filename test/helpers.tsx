import { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18nForTest from './i18Config'
import { BrowserRouter } from 'react-router-dom'

export const testAttribute = 'data-testid'

export function withTranslation(component: ReactNode) {
    return <I18nextProvider i18n={i18nForTest}>{component}</I18nextProvider>
}

export function withRouter(component: ReactNode) {
    return <BrowserRouter>{component}</BrowserRouter>
}

export function getStringClasses(component: Element) {
    return Array.from(component.classList).join(' ')
}
