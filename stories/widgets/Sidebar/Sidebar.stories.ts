import type { Meta, StoryObj } from '@storybook/react'

import { Sidebar } from 'src/widgets/Sidebar/SidebarIndex'
import { THEME } from 'src/app/providers/ThemeProvider/themeProviderIndex'
import { ThemeDecorator } from 'src/shared/config/storybook/decorators/ThemeDecorator'

const meta = {
    title: 'widget/Sidebar',
    component: Sidebar,
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
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
    args: {},
}

export const Dark: Story = {
    args: {},
    decorators: [ThemeDecorator(THEME.dark)],
}