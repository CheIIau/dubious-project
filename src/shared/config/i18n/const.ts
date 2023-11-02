import type { Resource } from 'i18next'
import { resources as resourcesEnum } from '../../../app/types/i18n/resources'

export const languages = ['ru-RU', 'en'] as const
export const defaultLanguage = 'en'
export const fallbackLanguage = 'ru-RU'
export const ns = getKeys(resourcesEnum)

export const resources = ns.reduce(
    (acc, n) => {
        languages.forEach((lng) => {
            if (!acc[lng]) acc[lng] = {}
            acc[lng] = {
                ...acc[lng],
                [n]: require(`../../../../public/locales/${lng}/${n}.json`),
            }
        })
        return acc
    },
    {} as Resource,
)

function getKeys<T extends object>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[]
}
