import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18nForTest from './i18Config'
import { MemoryRouter } from 'react-router-dom'
import type { StateSchema} from 'src/app/providers/StoreProvider/storeProviderIndex'
import { StoreProvider } from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { DeepPartial } from '@reduxjs/toolkit'

export const testAttribute = 'data-testid'
export interface RenderWrapperOptions {
    route?: string
    initialState? : DeepPartial<StateSchema>
}

export function renderWrapper(
    component: ReactNode,
    options: RenderWrapperOptions = {},
) {
    const { route = '/', initialState } = options
    return (
        <StoreProvider initialState={initialState}>
            <MemoryRouter initialEntries={[route]}>
                <I18nextProvider i18n={i18nForTest}>
                    {component}
                </I18nextProvider>
            </MemoryRouter>
        </StoreProvider>
    )
}

export function getStringClasses(component: Element) {
    return Array.from(component.classList).join(' ')
}
