import type { Meta, StoryObj } from '@storybook/react'

import { Flex } from 'src/shared/ui/Stack/Flex/Flex'

const meta = {
    title: 'shared/Flex',
    component: Flex,
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
        children: {
            description: 'Children',
        },
        justify: {
            description: 'Justify content css rule',
        },
        align: {
            description: 'Align items css rule',
        },
        direction: {
            description: 'Flex direction css rule',
        },
        wrap: {
            description: 'Flex wrap css rule',
        },
    },
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

export const Row: Story = {
    args: {
        direction: 'row',
        wrap: 'nowrap',
        className: 'gap-3',
        children: (
            <>
                <div>first</div>
                <div>second</div>
                <div>third</div>
                <div>fourth</div>
            </>
        ),
    },
}

export const Column: Story = {
    args: {
        direction: 'column',
        wrap: 'nowrap',
        className: 'gap-3',
        children: (
            <>
                <div>first</div>
                <div>second</div>
                <div>third</div>
                <div>fourth</div>
            </>
        ),
    },
}
