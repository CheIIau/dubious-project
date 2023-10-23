import type { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
import type { Decorator } from '@storybook/react'
import {
    StoreProvider,
    type StateSchema,
} from 'src/app/providers/StoreProvider/storeProviderIndex'

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
// DeepPartial special for prevent arrays having undefined elements
type DeepPartialSpecial<T> = T extends any[]
    ? T
    : T extends Record<string, any>
    ? {
          [P in keyof T]?: DeepPartialSpecial<T[P]>
      }
    : T
