import type { Meta, StoryObj } from '@storybook/react'
import ProfilePage from 'src/pages/ProfilePage/ProfilePage'
import { DEV_API_URL } from 'src/shared/api/api'
import { StoreDecorator } from 'src/shared/config/storybook/decorators/StoreDecorator'

const meta = {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    parameters: {
        layout: 'centered',
        mockData: [
            {
                url: `${DEV_API_URL}/profile`,
                method: 'GET',
                status: 200,
                response: {
                    firstname: 'John',
                    lastname: 'Doe',
                    age: 31,
                    currency: 'USD',
                    country: 'Ukraine',
                    city: 'Moscow',
                    username: 'admin',
                    avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
                },
            },
        ],
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
} satisfies Meta<typeof ProfilePage>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    decorators: [
        StoreDecorator({
            // можно подобным образом занести данные в стейт, но сверху уже мокнули запрос
            // profile: {
            //     form: {
            //         firstname: 'John',
            //         lastname: 'Doe',
            //         age: 31,
            //         currency: 'USD',
            //         country: 'Ukraine',
            //         city: 'Moscow',
            //         username: 'admin',
            //         avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
            //     },
            // },
        }),
    ],
    args: {},
}
