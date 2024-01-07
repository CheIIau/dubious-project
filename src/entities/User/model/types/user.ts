export interface User {
    id: string
    username: string
    avatar: string
    roles?: keyof typeof USER_ROLE
}

export interface UserSchema {
    authData: User | null
    _inited: boolean
}

export const USER_ROLE = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    MANAGER: 'MANAGER',
} as const
