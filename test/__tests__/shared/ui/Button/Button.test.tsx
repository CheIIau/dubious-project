import { render, screen } from '@testing-library/react'
import { Button, BUTTON_THEME } from 'src/shared/ui/Button/Button'

describe('Button.tsx', () => {
    it('renders with right text', () => {
        const text = 'Button'

        render(<Button>{text}</Button>)

        expect(screen.getByText(text).textContent).toBe(text)
    })

    it('sets theme on button', () => {
        const text = 'Button'

        const button = render(<Button>{text}</Button>)
        expect(button.container.innerHTML).not.toContain(BUTTON_THEME.clear)

        button.rerender(<Button theme={BUTTON_THEME.clear}>{text}</Button>)
        expect(button.container.innerHTML).toContain(BUTTON_THEME.clear)
    })
})
