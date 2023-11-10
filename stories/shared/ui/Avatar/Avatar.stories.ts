import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from 'src/shared/ui/Avatar/Avatar'
import AvatarImg from '../../../assets/Avatar/ava.jpg'

const meta = {
    title: 'shared/Avatar',
    component: Avatar,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        src: AvatarImg,
    },
    argTypes: {
        src: {
            description: 'Link to img',
        },
        size: {
            description: 'Img size',
        },
    },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: { size: 100 },
}

export const BiggerAvatar: Story = {
    args: { size: 200 },
}
