import type { CountriesType, CurrenciesType } from 'src/shared/types/common'

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

