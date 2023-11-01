import { fireEvent, render, screen } from '@testing-library/react'
import Counter, { counterReducer } from 'src/entities/Counter/counderIndex'
import { dynamicReducerWrapper } from 'test/helpers/dynamicReducerWrapper'
import { renderWrapper } from 'test/helpers/renderWrapper'

describe('Counter', () => {
    const VALUE_TEST_ID = 'value-text'
    const INC_BUTTON_TEXT = 'inc'
    const DEC_BUTTON_TEXT = 'dec'
    const COUNTER_VALUE = 0
    // const initialStateFactory = () => ({ counter: { value: COUNTER_VALUE } })

    const initialReducers = {
        counter: counterReducer,
    }
    it('renders default value', async () => {
        // const INITIAL_STATE = initialStateFactory()
        render(
            renderWrapper(
                dynamicReducerWrapper(<Counter />, {
                    reducers: initialReducers,
                }),
            ),
        )
        const valueText = screen.getByTestId(VALUE_TEST_ID).textContent

        expect(valueText).toContain(COUNTER_VALUE)
    })

    it('increases counter on increment button click', async () => {
        // await i18next.changeLanguage('ru-RU', (e, t) => {})
        // const INITIAL_STATE = initialStateFactory()
        render(
            renderWrapper(
                dynamicReducerWrapper(<Counter />, {
                    reducers: initialReducers,
                }),
            ),
        )
        const valueTextElement = screen.getByTestId(VALUE_TEST_ID)
        expect(valueTextElement.textContent).toContain(COUNTER_VALUE)
        const incButton = screen.getByText(INC_BUTTON_TEXT)
        fireEvent.click(incButton)

        expect(valueTextElement.textContent).toContain(COUNTER_VALUE + 1)
    })

    it('decreases counter on decrement button click', async () => {
        // const INITIAL_STATE = initialStateFactory()
        render(
            renderWrapper(
                dynamicReducerWrapper(<Counter />, {
                    reducers: initialReducers,
                }),
            ),
        )
        const valueTextElement = screen.getByTestId(VALUE_TEST_ID)
        expect(valueTextElement.textContent).toContain(COUNTER_VALUE)
        const incButton = screen.getByText(DEC_BUTTON_TEXT)

        fireEvent.click(incButton)

        expect(valueTextElement.textContent).toContain(COUNTER_VALUE - 1)
    })
})
