import type { Meta, StoryObj } from '@storybook/react'
import { Select } from 'src/shared/ui/Select/Select'

const meta = {
    title: 'shared/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        label: 'Label',
        options: [
            { value: '123', content: '123' },
            { value: '321', content: '321' },
        ],
    },
    argTypes: {
        label: {
            description: 'Label text',
        },
        value: {
            description: 'Default value',
        },
    },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}
