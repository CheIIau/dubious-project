import type { Meta, StoryObj } from '@storybook/react'
import { AppLink } from 'src/shared/ui/AppLink/AppLink'
import { ThemeDecorator } from 'src/shared/config/storybook/decorators/ThemeDecorator'
import { RouterDecorator } from 'src/shared/config/storybook/decorators/RouterDecorator'

const meta = {
    title: 'shared/AppLink',
    component: AppLink,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        className: '',
        to: '',
        children: 'AppLink'
    },
    argTypes: {
        className: {
            description: 'Given classes',
        },
        theme: {
            description: 'Theme',
        },
    },
    decorators: [RouterDecorator]
} satisfies Meta<typeof AppLink>

export default meta
type Story = StoryObj<typeof meta>

export const PrimaryLight: Story = {
    args: {
        theme: 'primary',
    },
}

export const PrimaryDark: Story = {
    args: {
        theme: 'primary'
    },
    decorators: [ThemeDecorator('dark')],
}

export const SecondaryLight: Story = {
    args: {
        theme: 'secondary',
    },
}

export const SecondaryDark: Story = {
    args: {
        theme: 'secondary'
    },
    decorators: [ThemeDecorator('dark')],
}
