/* eslint-disable i18next/no-literal-string */
import { render, screen } from '@testing-library/react'
import { Button, THEME_BUTTON } from 'src/shared/ui/Button/Button'

describe('Button.tsx', () => {
    it('renders with right text', () => {
        const text = 'Button'

        render(<Button>{text}</Button>)

        expect(screen.getByText(text).textContent).toBe(text)
    })

    it('sets theme on button', () => {
        const text = 'Button'

        const button = render(<Button>{text}</Button>)
        expect(button.container.innerHTML).not.toContain(THEME_BUTTON.clear)

        button.rerender(<Button theme={THEME_BUTTON.clear}>{text}</Button>)
        expect(button.container.innerHTML).toContain(THEME_BUTTON.clear)
    })
})
