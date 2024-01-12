import type { Meta, StoryObj } from '@storybook/react'
import { THEME } from 'src/app/providers/ThemeProvider/themeProviderIndex'
import { counterReducer } from 'src/entities/Counter/counderIndex'
import AboutPage from 'src/pages/AboutPage/AboutPage'
import { StoreDecorator } from 'src/shared/config/storybook/decorators/StoreDecorator'
import { ThemeDecorator } from 'src/shared/config/storybook/decorators/ThemeDecorator'
import {
    withRouter,
} from 'storybook-addon-react-router-v6'
const meta = {
    title: 'pages/AboutPage',
    component: AboutPage,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        className: '',
    },
    argTypes: {
        className: {
            description: 'Given classes',
        },
    },
    decorators: [
        StoreDecorator({ counter: { value: 0 } }, { counter: counterReducer }),
        withRouter,
    ],
} satisfies Meta<typeof AboutPage>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
    args: {},
}

export const Dark: Story = {
    args: {},
    decorators: [ThemeDecorator(THEME.dark)],
}