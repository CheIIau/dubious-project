

export const languages = ['ru-RU', 'en'] as const
export const defaultLanguage = 'en'
export const fallbackLanguage = 'ru-RU'
export const ns = ['translation', 'about', 'main']

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