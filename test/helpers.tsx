import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18nForTest from './i18Config'

export const testAttribute = 'data-testid'

export function renderWithTranslation(component: ReactNode) {
    return render(
        <I18nextProvider i18n={i18nForTest}>{component}</I18nextProvider>
    )
}

export function getStringClasses(component: Element) {
    return Array.from(component.classList).join(' ')
}
