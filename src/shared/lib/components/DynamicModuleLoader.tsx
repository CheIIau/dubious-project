import { useEffect, type FC, type PropsWithChildren } from 'react'
import type { StateSchemaKey } from 'src/app/providers/StoreProvider/config/StateSchema'
import type { Reducer } from '@reduxjs/toolkit'
import { useAppDispatch, useAppStore } from '../hooks/storeHooks'

export type ReducersList = {
    [key in StateSchemaKey]?: Reducer
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
        Object.entries(reducers).forEach(([key, reducer]) => {
            const stateKey = key as StateSchemaKey
            store.reducerManager.add(stateKey, reducer)
            dispatch({ type: `@INIT ${stateKey} reducer` })
        })

        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([key]) => {
                    const stateKey = key as StateSchemaKey
                    store.reducerManager.remove(stateKey)
                    dispatch({ type: `@DESTROY ${stateKey} reducer` })
                })
            }
        }
    }, [])

    return <>{children}</>
}
