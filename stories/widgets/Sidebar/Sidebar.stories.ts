import type { Meta, StoryObj } from '@storybook/react'

import { Sidebar } from 'src/widgets/Sidebar/SidebarIndex'
import { CustomThemeDecorator } from 'src/shared/config/storybook/decorators/CustomThemeDecorator'
import { RouterDecorator } from 'src/shared/config/storybook/decorators/RouterDecorator'
import { THEME } from 'src/shared/const/theme'
import { StoreDecorator } from 'src/shared/config/storybook/decorators/StoreDecorator'

const meta = {
    title: 'widget/Sidebar',
    component: Sidebar,
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
    decorators: [RouterDecorator, StoreDecorator({})]
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
    args: {},
}

export const Dark: Story = {
    args: {},
    decorators: [CustomThemeDecorator(THEME.dark)],
}