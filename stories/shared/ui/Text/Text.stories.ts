import type { Meta, StoryObj } from '@storybook/react'

import { CustomThemeDecorator } from 'src/shared/config/storybook/decorators/CustomThemeDecorator'
import { THEME } from 'src/shared/const/theme'
import { TEXT_THEME, Text } from 'src/shared/ui/Text/Text'

const meta = {
    title: 'shared/Text',
    component: Text,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {},
    argTypes: {},
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const TextWithTitle: Story = {
    args: {
        text: 'text',
        title: 'title',
    },
}

export const OnlyTitle: Story = {
    args: {
        title: 'title',
    },
}

export const OnlyText: Story = {
    args: {
        text: 'text',
    },
}

export const TextWithTitleDark: Story = {
    args: {
        text: 'text',
        title: 'title',
    },
    decorators: [CustomThemeDecorator(THEME.dark)],
}

export const TextWithTitleError: Story = {
    args: {
        text: 'text',
        title: 'title',
        theme: TEXT_THEME.error,
    },
}
