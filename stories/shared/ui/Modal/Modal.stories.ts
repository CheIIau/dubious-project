import type { Meta, StoryObj } from '@storybook/react'
import { THEME } from 'src/shared/const/theme'
import { CustomThemeDecorator } from 'src/shared/config/storybook/decorators/CustomThemeDecorator'

import { Modal } from 'src/shared/ui/Modal/Modal'

const meta = {
    title: 'shared/Modal',
    component: Modal,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    args: {
        className: '',
        isOpen: true,
        children: 'Modal text',
    },
    argTypes: {
        className: {
            description: 'Given classes',
        },
        isOpen: {
            description: 'Open/close modal flag',
        },
        onClose: {
            description: 'On modal close callback',
        },
        children: {
            description: 'Modal content',
        },
    },
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
    args: {},
    decorators: [CustomThemeDecorator(THEME.light)],
}

export const Dark: Story = {
    args: {},
    decorators: [CustomThemeDecorator(THEME.dark)],
}
