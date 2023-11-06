import type { CountriesType, CurrenciesType } from 'src/shared/types/common'

export interface Profile {
    firstname?: string
    lastname?: string
    age?: number
    currency?: CurrenciesType
    country?: CountriesType
    city?: string
    username?: string
    avatar?: string
}

export interface ProfileSchema {
    data: Profile | null
    error: string | null
    loading: boolean
    readonly: boolean
}
