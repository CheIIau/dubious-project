import type { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { createStore } from '../config/store'
import type { StateSchema } from '../storeProviderIndex'
import type { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
interface StoreProviderProps extends PropsWithChildren {
    readonly initialState?: DeepPartial<StateSchema>
    readonly asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider: FC<StoreProviderProps> = ({
    children,
    initialState,
    asyncReducers,
}) => {

    const store = createStore(
        initialState as StateSchema,
        asyncReducers as ReducersMapObject<StateSchema>,
    )

    return <Provider store={store}>{children}</Provider>
}
