import type { Meta, StoryObj } from '@storybook/react'
import { THEME } from 'src/app/providers/ThemeProvider/themeProviderIndex'
import { ThemeDecorator } from 'src/shared/config/storybook/decorators/ThemeDecorator'

import { Spinner } from 'src/shared/ui/Spinner/Spinner'

const meta = {
    title: 'shared/Spinner',
    component: Spinner,
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
        color: {
            description: 'Spinner color',
        },
        size: {
            description: 'Spinner size',
        },
    },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
    args: {},
}

export const Dark: Story = {
    args: {},
    decorators: [ThemeDecorator(THEME.dark)],
}

export const Small: Story = {
    args: {
        size: '30px',
    },
}

export const Large: Story = {
    args: {
        size: '100px',
    },
}

export const Red: Story = {
    args: {
        color: 'red',
    },
}
