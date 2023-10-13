import type { FC, PropsWithChildren } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'src/shared/ui/Button/Button'
import { counterActions } from '../model/slice/counterSlice'
import { getCounterValue } from '../model/selectors/counterSelector'

interface CounterProps extends PropsWithChildren {}

export const Counter: FC<CounterProps> = () => {
    const dispatch = useDispatch()
    const counterValue = useSelector(
        getCounterValue
    )
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
