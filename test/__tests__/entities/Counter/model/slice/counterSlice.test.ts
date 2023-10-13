import type { CounterSchema } from 'src/entities/Counter/counderIndex'
import {
    counterActions,
    counterReducer,
} from 'src/entities/Counter/counderIndex'

describe('counterSlice', () => {
    const VALUE = 10
    it('decrement value ', () => {
        const NEXT_VALUE = 9
        const state: CounterSchema = { value: VALUE }
        expect(counterReducer(state, counterActions.decrement())).toEqual({ value: NEXT_VALUE })
    })

    it('increment value ', () => {
        const NEXT_VALUE = 11
        const state: CounterSchema = { value: VALUE }
        expect(counterReducer(state, counterActions.increment())).toEqual({ value: NEXT_VALUE })
    })

    it('should work with empty state', () => {
        //  INITIAL_STATE === 0
        expect(counterReducer(undefined, counterActions.increment())).toEqual({ value: 1 })
    })
})
