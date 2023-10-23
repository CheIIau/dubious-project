import type { Meta, StoryObj } from '@storybook/react'
import LoginForm from 'src/features/AuthByUsername/ui/LoginForm/LoginForm'
import { StoreDecorator } from 'src/shared/config/storybook/decorators/StoreDecorator'

const meta = {
    title: 'shared/LoginForm',
    component: LoginForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {},
    argTypes: {},
    decorators: [
        StoreDecorator({ loginForm: { username: '123', password: 'qwerty' } }),
    ],
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}

export const WithError: Story = {
    decorators: [
        StoreDecorator({
            loginForm: {
                error: 'Some error',
            },
        }),
    ],
}

export const Loading: Story = {
    decorators: [
        StoreDecorator({
            loginForm: {
                loading: true,
            },
        }),
    ],
}
