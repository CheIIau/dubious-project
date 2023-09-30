import { useState } from 'react'
import CounterStyles from './Counter.module.scss'

export const Counter = () => {
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count + 1)
    }

    return (
        <div>
            <button className={CounterStyles['counter-button']} onClick={increment}>
                inc {count}
            </button>
        </div>
    )
}
