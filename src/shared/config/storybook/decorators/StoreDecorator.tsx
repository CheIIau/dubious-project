import type { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
import type { Decorator } from '@storybook/react'
import {
    StoreProvider,
    type StateSchema,
} from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { DeepPartialSpecial } from 'src/shared/types/helpers'

type AsyncReducer = DeepPartialSpecial<ReducersMapObject<StateSchema>>

export const StoreDecorator: (
    state: DeepPartialSpecial<StateSchema>,
    asyncReducers?: AsyncReducer,
) => Decorator = (state, asyncReducers) => {
    return function StoryWithStore(Story) {
        return (
            <StoreProvider
                initialState={state as StateSchema}
                asyncReducers={
                    asyncReducers as DeepPartial<ReducersMapObject<StateSchema>>
                }
            >
                <Story />
            </StoreProvider>
        )
    }
}
