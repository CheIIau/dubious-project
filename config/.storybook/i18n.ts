import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import I18NextHttpBackend, { HttpBackendOptions } from 'i18next-http-backend'
import { languages, fallbackLanguage, defaultLanguage } from '../../src/shared/config/i18n/const'

const ns = ['translation', 'about', 'main']
const resources = ns.reduce((acc, n) => {
    languages.forEach((lng) => {
        if (!acc[lng]) acc[lng] = {}
        acc[lng] = {
            ...acc[lng],
            [n]: require(`../../public/locales/${lng}/${n}.json`),
        }
    })
    return acc
}, {})

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .use(I18NextHttpBackend)
    .init<HttpBackendOptions>({
        lng: defaultLanguage,
        fallbackLng: fallbackLanguage,
        ns,
        react: { useSuspense: false },
        supportedLngs: languages,
        resources,
    })

export default i18n
