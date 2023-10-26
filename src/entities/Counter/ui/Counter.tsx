import type { FC, PropsWithChildren } from 'react'
import { Button } from 'src/shared/ui/Button/Button'
import { counterActions } from '../model/slice/counterSlice'
import { getCounterValue } from '../counderIndex'
import { useAppDispatch, useAppSelector } from 'src/shared/lib/hooks/store'

interface CounterProps extends PropsWithChildren {}

export const Counter: FC<CounterProps> = () => {
    const dispatch = useAppDispatch()
    const counterValue = useAppSelector(getCounterValue)
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
