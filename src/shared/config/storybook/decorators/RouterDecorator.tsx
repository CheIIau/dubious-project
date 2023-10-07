import 'src/app/styles/storybook.scss'
import { Decorator } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

export const RouterDecorator: Decorator = (Story) => {
    return (
        <BrowserRouter>
            <Story />
        </BrowserRouter>
    )
}
