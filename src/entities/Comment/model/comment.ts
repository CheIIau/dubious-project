import type { User } from 'src/entities/User/userIndex'

export interface Comment {
    id: string
    user: User
    text: string
}
