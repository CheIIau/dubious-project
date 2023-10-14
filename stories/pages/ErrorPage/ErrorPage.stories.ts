import type { Meta, StoryObj } from '@storybook/react'
import { THEME } from 'src/app/providers/ThemeProvider/themeProviderIndex'
import ErrorPage from 'src/pages/ErrorPage/ErrorPage'
import { ThemeDecorator } from 'src/shared/config/storybook/decorators/ThemeDecorator'

const meta = {
    title: 'pages/ErrorPage',
    component: ErrorPage,
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
} satisfies Meta<typeof ErrorPage>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
    args: {},
}

export const Dark: Story = {
    args: {},
    decorators: [ThemeDecorator(THEME.dark)],
}
