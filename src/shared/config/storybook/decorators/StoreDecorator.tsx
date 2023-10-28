import type { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
import type { Decorator } from '@storybook/react'
import {
    StoreProvider,
    type StateSchema,
} from 'src/app/providers/StoreProvider/storeProviderIndex'
import type { DeepPartialSpecial } from 'src/shared/types/helpers'

export const StoreDecorator: (
    state: DeepPartialSpecial<StateSchema>,
    asyncReducers?: DeepPartialSpecial<ReducersMapObject<StateSchema>>,
) => Decorator = (state, asyncReducers) => {
    return function StoryWithStore(Story) {
        return (
            <StoreProvider
                ///@ts-expect-error
                initialState={state}
                asyncReducers={
                    asyncReducers as DeepPartial<ReducersMapObject<StateSchema>>
                }
            >
                <Story />
            </StoreProvider>
        )
    }
}
