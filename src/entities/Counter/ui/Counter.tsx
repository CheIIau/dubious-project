import type { FC, PropsWithChildren } from 'react'
import { Button } from 'src/shared/ui/Button/Button'
import { counterActions } from '../model/slice/counterSlice'
import {
    useAppDispatch,
    useAppSelector,
} from 'src/app/providers/StoreProvider/config/store'

interface CounterProps extends PropsWithChildren {}

export const Counter: FC<CounterProps> = () => {
    const dispatch = useAppDispatch()
    const counterValue = useAppSelector((state) => state.counter.value)
    const inc = () => {
        dispatch(counterActions.increment())
    }
    const dec = () => {
        dispatch(counterActions.decrement())
    }
    return (
        <div>
            <h1 data-testid="value-text">value = {counterValue}</h1>
            <Button onClick={inc}>inc</Button>
            <Button onClick={dec}>dec</Button>
        </div>
    )
}
