import { Counter } from './ui/Counter'
export { counterReducer, counterActions } from './model/slice/counterSlice'
export type { CounterSchema } from './model/types/counterSchema'
export {
    getCounter,
    getCounterValue,
} from './model/selectors/counterSelector'
export default Counter