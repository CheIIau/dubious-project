import type { CountriesType, CurrenciesType } from 'src/shared/types/common'
import type { VALIDATE_PROFILE_ERROR_MESSAGES_KEYS } from '../const/const'

export interface Profile {
    id?: string
    firstname?: string
    lastname?: string
    age?: number
    currency?: CurrenciesType
    country?: CountriesType
    city?: string
    username?: string
    avatar?: string
}

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
