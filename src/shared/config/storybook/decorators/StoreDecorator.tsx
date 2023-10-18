import type { DeepPartial } from '@reduxjs/toolkit'
import type { Decorator } from '@storybook/react'
import {
    StoreProvider,
    type StateSchema,
} from 'src/app/providers/StoreProvider/storeProviderIndex'

export const StoreDecorator: (state: DeepPartial<StateSchema>) => Decorator = (
    state,
) => {
    return function StoryWithStore(Story) {
        return (
            <StoreProvider initialState={state}>
                <Story />
            </StoreProvider>
        )
    }
}
