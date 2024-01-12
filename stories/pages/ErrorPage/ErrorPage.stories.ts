import type { Meta, StoryObj } from '@storybook/react'
import { THEME } from 'src/app/providers/ThemeProvider/themeProviderIndex'
import ErrorPage from 'src/pages/ErrorPage/ErrorPage'
import { StoreDecorator } from 'src/shared/config/storybook/decorators/StoreDecorator'
import { ThemeDecorator } from 'src/shared/config/storybook/decorators/ThemeDecorator'
import { withRouter } from 'storybook-addon-react-router-v6'

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
    decorators: [withRouter, StoreDecorator({})],
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
