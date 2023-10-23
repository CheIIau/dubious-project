import { createSelector } from '@reduxjs/toolkit'
import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'

export const getCounter = (state: StateSchema) => state.counter

export const getCounterValue = createSelector(
    getCounter,
    (counter) => counter?.value,
)