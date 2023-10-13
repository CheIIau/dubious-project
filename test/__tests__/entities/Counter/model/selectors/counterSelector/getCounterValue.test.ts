import type { DeepPartial } from '@reduxjs/toolkit'
import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'
import { getCounterValue } from 'src/entities/Counter/counderIndex'

describe('getCounterValue', () => {
    it('should return counter value', () => {
        const counter = { value: 10 }
        const state: DeepPartial<StateSchema> = {
            counter,
        }
        expect(getCounterValue(state as StateSchema)).toBe(10)
    })
})