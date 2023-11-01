import { resources as resourcesEnum } from '../../../app/types/i18n/resources'

export const languages = ['ru-RU', 'en'] as const
export const defaultLanguage = 'en'
export const fallbackLanguage = 'ru-RU'
export const ns = getKeys(resourcesEnum)

export const resources = ns.reduce((acc, n) => {
    languages.forEach((lng) => {
        /// @ts-expect-error
        if (!acc[lng]) acc[lng] = {}
        /// @ts-expect-error
        acc[lng] = {
            /// @ts-expect-error
            ...acc[lng],
            [n]: require(`../../../../public/locales/${lng}/${n}.json`),
        }
    })
    return acc
}, {})

function getKeys<T extends object>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[]
}