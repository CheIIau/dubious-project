import type { Meta, StoryObj } from '@storybook/react'
import { AppLink } from 'src/shared/ui/AppLink/AppLink'
import { CustomThemeDecorator } from 'src/shared/config/storybook/decorators/CustomThemeDecorator'
import { RouterDecorator } from 'src/shared/config/storybook/decorators/RouterDecorator'
import { THEME } from 'src/shared/const/theme'

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
    decorators: [CustomThemeDecorator(THEME.dark)],
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
    decorators: [CustomThemeDecorator(THEME.dark)],
}
