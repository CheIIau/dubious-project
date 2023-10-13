import type { DeepPartial } from '@reduxjs/toolkit'
import type { StateSchema } from 'src/app/providers/StoreProvider/storeProviderIndex'
import { getCounter } from 'src/entities/Counter/counderIndex'

describe('getCounter', () => {
    it('should return counter value', () => {
        const counter = { value: 10 }
        const state: DeepPartial<StateSchema> = {
            counter,
        }
        expect(getCounter(state as StateSchema)).toEqual(counter)
    })
})