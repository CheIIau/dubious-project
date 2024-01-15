import type { Meta, StoryObj } from '@storybook/react'

import { Navbar } from 'src/widgets/Navbar/NavbarIndex'
import { ThemeDecorator } from 'src/shared/config/storybook/decorators/ThemeDecorator'
import { RouterDecorator } from 'src/shared/config/storybook/decorators/RouterDecorator'
import { THEME } from 'src/shared/const/theme'
import { StoreDecorator } from 'src/shared/config/storybook/decorators/StoreDecorator'

const meta = {
    title: 'widget/Navbar',
    component: Navbar,
    parameters: {
        layout: 'fullscreen',
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
    decorators: [RouterDecorator, StoreDecorator({ user: { authData: null } })],
} satisfies Meta<typeof Navbar>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
    args: {},
}

export const Dark: Story = {
    args: {},
    decorators: [ThemeDecorator(THEME.dark)],
}

export const SignedUser: Story = {
    decorators: [
        StoreDecorator({ user: { authData: { username: '123', id: '123' } } }),
    ],
}

export const UnsignedUser: Story = {
    decorators: [StoreDecorator({ user: { authData: null } })],
}
