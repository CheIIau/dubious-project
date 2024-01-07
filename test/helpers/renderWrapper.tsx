import { type ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18nForTest from '../i18Config'
import { MemoryRouter } from 'react-router-dom'
import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'
import { StoreProvider } from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
import type { DeepPartialSpecial } from 'src/shared/types/helpers'

export interface RenderWrapperOptions {
    route?: string
    initialState?: DeepPartialSpecial<StateSchema>
    asyncReducers?: DeepPartialSpecial<ReducersMapObject<StateSchema>>
}

export function renderWrapper(
    component: ReactNode,
    options: RenderWrapperOptions = {},
) {
    const { route = '/', initialState, asyncReducers } = options
    return (
        <StoreProvider
            asyncReducers={
                asyncReducers as DeepPartial<ReducersMapObject<StateSchema>>
            }
            initialState={initialState as DeepPartial<StateSchema>}
        >
            <MemoryRouter initialEntries={[route]}>
                <I18nextProvider i18n={i18nForTest}>
                    {component}
                </I18nextProvider>
            </MemoryRouter>
        </StoreProvider>
    )
}
