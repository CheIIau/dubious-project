import type { Profile } from 'src/entities/Profile/profileIndex'
import type { VALIDATE_PROFILE_ERROR_MESSAGES_KEYS } from '../const/const'

export type ValidateProfileErrorKeyType =
    (typeof VALIDATE_PROFILE_ERROR_MESSAGES_KEYS)[keyof typeof VALIDATE_PROFILE_ERROR_MESSAGES_KEYS]
    
export interface ProfileSchema {
    data: Profile | null
    form: Profile | null
    error: string | null
    loading: boolean
    readonly: boolean
    validateError: ValidateProfileErrorKeyType[] | null
}
