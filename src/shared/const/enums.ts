import type { CurrenciesType, CountriesType } from '../types/common'

export const CURRENCIES: Record<CurrenciesType, CurrenciesType> = {
    RUB: 'RUB',
    USD: 'USD',
    EUR: 'EUR',
} as const

export const COUNTRIES: Record<CountriesType, CountriesType> = {
    Belarus: 'Belarus',
    Russia: 'Russia',
    USA: 'USA',
    Zimbabwe: 'Zimbabwe',
    Ukraine: 'Ukraine',
} as const
