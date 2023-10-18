import type { Meta, StoryObj } from '@storybook/react'

import { Button } from 'src/shared/ui/Button/Button'
import { ThemeDecorator } from 'src/shared/config/storybook/decorators/ThemeDecorator'
import { THEME } from 'src/app/providers/ThemeProvider/themeProviderIndex'

const meta = {
    title: 'shared/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        children: 'Button',
    },
    argTypes: {
        children: {
            description: 'Button children',
        },
        theme: {
            description: 'Button theme',
        },
    },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {},
}

export const PrimaryDark: Story = {
    args: {},
    decorators: [ThemeDecorator(THEME.dark)],
}

export const Clear: Story = {
    args: {
        theme: 'clear',
    },
}

export const ClearInverted: Story = {
    args: {
        theme: 'clear-inverted',
    },
}
export const ClearDark: Story = {
    args: {
        theme: 'clear',
    },
    decorators: [ThemeDecorator(THEME.dark)],
}

export const Outline: Story = {
    args: {
        theme: 'outline',
    },
}

export const OutlineDark: Story = {
    args: {
        theme: 'outline',
    },
    decorators: [ThemeDecorator(THEME.dark)],
}

export const Square: Story = {
    args: {
        square: true,
        children: '>'
    },
}

export const Large: Story = {
    args: {
        size: 'l',
    },
}

export const ExtraLarge: Story = {
    args: {
        size: 'xl',
    },
}

export const Disabled: Story = {
    args: {
        disabled: true
    },
}
