import type { Meta, StoryObj } from '@storybook/react'

import { Button, BUTTON_THEME } from 'src/shared/ui/Button/Button'
import { THEME } from 'src/app/providers/ThemeProvider/themeProviderIndex'
import { ThemeDecorator } from 'src/shared/config/storybook/decorators/ThemeDecorator'

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
        theme: BUTTON_THEME.clear,
    },
}
export const ClearDark: Story = {
    args: {
        theme: BUTTON_THEME.clear,
    },
    decorators: [ThemeDecorator(THEME.dark)],
}

export const Outline: Story = {
    args: {
        theme: BUTTON_THEME.outline,
    },
}

export const OutlineDark: Story = {
    args: {
        theme: BUTTON_THEME.outline,
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
