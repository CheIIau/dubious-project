import type { Meta, StoryObj } from '@storybook/react'
import { LoginForm } from 'src/features/AuthByUsername/ui/LoginForm/LoginForm'
import { useState } from 'react'

const meta = {
    title: 'shared/LoginForm',
    component: LoginForm,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
    },
    argTypes: {
    },
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {},
}