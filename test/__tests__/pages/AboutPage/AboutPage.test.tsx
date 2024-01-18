import { render, screen } from '@testing-library/react'
import Counter, { counterReducer } from 'src/entities/Counter/counderIndex'
import { dynamicReducerWrapper } from '~/test/helpers/dynamicReducerWrapper'
import { renderWrapper } from '~/test/helpers/renderWrapper'

describe('AboutPage', () => {
    const initialReducers = {
        counter: counterReducer,
    }
    it('renders counter', async () => {
        const renderResult = render(
            renderWrapper(
                dynamicReducerWrapper(<Counter />, {
                    reducers: initialReducers,
                }),
            ),
        )
        const page = screen.getByText('value', { exact: false })
    })
})
