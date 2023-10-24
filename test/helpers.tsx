import { Suspense, type ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18nForTest from './i18Config'
import { MemoryRouter } from 'react-router-dom'
import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'
import { StoreProvider } from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { AnyAction, DeepPartial, ThunkDispatch } from '@reduxjs/toolkit'
import type { ReducersList } from 'src/shared/lib/components/DynamicModuleLoader'
import { DynamicModuleLoader } from 'src/shared/lib/components/DynamicModuleLoader'
import type { AsyncThunkAction } from '@reduxjs/toolkit'

export const testAttribute = 'data-testid'
export interface RenderWrapperOptions {
    route?: string
    initialState?: DeepPartial<StateSchema>
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

export interface DynamicReducerWrapperOptions {
    readonly reducers: ReducersList
    readonly removeAfterUnmount?: boolean
}

export function dynamicReducerWrapper(
    component: ReactNode,
    options: DynamicReducerWrapperOptions,
) {
    return (
        <DynamicModuleLoader reducers={options.reducers}>
            <Suspense>{component}</Suspense>
        </DynamicModuleLoader>
    )
}

type ActionCreatorType<Return, Arg, RejectedValue> = (
    arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>

export class MockAsyncThunk<Return, Arg, RejectedValue> {
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
    getState: () => StateSchema
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>

    constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
        this.actionCreator = actionCreator
        this.dispatch = vi.fn()
        this.getState = vi.fn()
    }

    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg)
        const result = await action(this.dispatch, this.getState, undefined)

        return result
    }
}
