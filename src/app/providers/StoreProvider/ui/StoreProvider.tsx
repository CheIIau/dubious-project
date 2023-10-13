import type { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { createStore } from '../config/store'
import type { StateSchema } from '../config/StateSchema'
import type { DeepPartial } from '@reduxjs/toolkit'

interface StoreProviderProps extends PropsWithChildren {
    readonly initialState?: DeepPartial<StateSchema>
}

export const StoreProvider: FC<StoreProviderProps> = ({
    children,
    initialState,
}) => {
    const store = createStore(initialState as StateSchema)
    return <Provider store={store}>{children}</Provider>
}
