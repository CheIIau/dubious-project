import type { Meta, StoryObj } from '@storybook/react'

import { Button, THEME_BUTTON } from 'src/shared/ui/Button/Button'
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
        theme: THEME_BUTTON.clear,
    },
}
export const ClearDark: Story = {
    args: {
        theme: THEME_BUTTON.clear,
    },
    decorators: [ThemeDecorator(THEME.dark)],
}

export const Outline: Story = {
    args: {
        theme: THEME_BUTTON.outline,
    },
}

export const OutlineDark: Story = {
    args: {
        theme: THEME_BUTTON.outline,
    },
    decorators: [ThemeDecorator(THEME.dark)],
}
