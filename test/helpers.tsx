import { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18nForTest from './i18Config'
import { MemoryRouter } from 'react-router-dom'

export const testAttribute = 'data-testid'
export interface RenderWrapperOptions {
    route?: string
}

export function renderWrapper(
    component: ReactNode,
    options: RenderWrapperOptions = {},
) {
    const { route = '/' } = options
    return (
        <MemoryRouter initialEntries={[route]}>
            <I18nextProvider i18n={i18nForTest}>{component}</I18nextProvider>
        </MemoryRouter>
    )
}

export function getStringClasses(component: Element) {
    return Array.from(component.classList).join(' ')
}
