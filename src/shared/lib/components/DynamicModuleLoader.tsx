import { useEffect, type FC, type PropsWithChildren } from 'react'
import type {
    StateSchema,
    StateSchemaKey,
} from 'src/app/providers/StoreProvider/config/StateSchema'
import type { Reducer } from '@reduxjs/toolkit'
import { useAppDispatch, useAppStore } from '../hooks/storeHooks'

export type ReducersList = {
    [key in StateSchemaKey]?: Reducer<NonNullable<StateSchema[key]>>
}

interface DynamicModuleLoaderProps extends PropsWithChildren {
    readonly reducers: ReducersList
    readonly removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = ({
    children,
    reducers,
    removeAfterUnmount = true,
}) => {
    const store = useAppStore()
    const dispatch = useAppDispatch()

    useEffect(() => {
        const mountedReducersList = store.reducerManager.getReducerMap()

        Object.entries(reducers).forEach(([key, reducer]) => {
            const mountedReducer = mountedReducersList[key as StateSchemaKey]
            if (!mountedReducer) {
                store.reducerManager.add(key as StateSchemaKey, reducer)
                dispatch({ type: `@INIT ${key} reducer` })
            }
        })

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([key]) => {
                    store.reducerManager.remove(key as StateSchemaKey)
                    dispatch({ type: `@DESTROY ${key} reducer` })
                })
            }
        }
    }, [dispatch, reducers, removeAfterUnmount, store.reducerManager])

    return <>{children}</>
}
