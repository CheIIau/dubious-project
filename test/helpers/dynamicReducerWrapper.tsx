import { Suspense, type ReactNode } from 'react'
import type { ReducersList } from 'src/shared/lib/components/DynamicModuleLoader'
import { DynamicModuleLoader } from 'src/shared/lib/components/DynamicModuleLoader'

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
