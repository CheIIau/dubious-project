import type { Meta, StoryObj } from '@storybook/react'
import { Dropdown } from 'src/shared/ui/Popups/ui/Dropdown/Dropdown'
import { CustomThemeDecorator } from 'src/shared/config/storybook/decorators/CustomThemeDecorator'
import { THEME } from 'src/shared/const/theme'
import { Button } from 'src/shared/ui/Button/Button'

const meta = {
    title: 'shared/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {},
    argTypes: {},
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        direction: 'bottom',
        trigger: <Button>Open</Button>,
        items: [
            { content: 'first' },
            { content: 'second' },
            { content: 'third' },
        ],
    },
    decorators: [CustomThemeDecorator(THEME.light)],
}

export const TopRight: Story = {
    args: {
        direction: 'top-right',
        trigger: <Button>Open</Button>,
        items: [
            { content: 'first' },
            { content: 'second' },
            { content: 'third' },
        ],
    },
    decorators: [CustomThemeDecorator(THEME.light)],
}

export const TopLeft: Story = {
    args: {
        direction: 'top-left',
        trigger: <Button>Open</Button>,
        items: [
            { content: 'first' },
            { content: 'second' },
            { content: 'third' },
        ],
    },
    decorators: [CustomThemeDecorator(THEME.light)],
}
export const BottomLeft: Story = {
    args: {
        direction: 'bottom-left',
        trigger: <Button>Open</Button>,
        items: [
            { content: 'first' },
            { content: 'second' },
            { content: 'third' },
        ],
    },
    decorators: [CustomThemeDecorator(THEME.light)],
}
export const BottomRight: Story = {
    args: {
        direction: 'bottom-right',
        trigger: <Button>Open</Button>,
        items: [
            { content: 'first' },
            { content: 'second' },
            { content: 'third' },
        ],
    },
    decorators: [CustomThemeDecorator(THEME.light)],
}
