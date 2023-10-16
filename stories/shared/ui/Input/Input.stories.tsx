import type { Meta, StoryObj } from '@storybook/react'
import { Input } from 'src/shared/ui/Input/Input'
import { useState } from 'react'

const meta = {
    title: 'shared/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        value: 'Text',
        type: 'text',
    },
    argTypes: {
        value: {
            description: 'Input value',
        },
        placeholder: {
            description: 'Input placeholder',
        },
        autoFocus: {
            description: 'Sets focus on input when mounted',
        },
        type: {
            description: 'Input type',
        },
    },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}

export const WithPlaceholder: Story = {
    args: {
        placeholder: 'Placeholder',
    },
}
///@ts-expect-error
const InputWithState = ({ placeholder }) => {
    const [value, setValue] = useState('Secondary')

    return (
        <Input
            value={value}
            onChange={setValue}
            placeholder={placeholder}
        />
    )
}

export const WithWorkingInput: Story = {
    render: ({ ...args }) => <InputWithState placeholder={args.placeholder} />,
    args: {
        placeholder: 'Placeholder',
    },
}
