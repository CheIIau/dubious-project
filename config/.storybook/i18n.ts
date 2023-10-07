import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import I18NextHttpBackend, { HttpBackendOptions } from 'i18next-http-backend'

const ns = ['translation', 'about', 'main']
const supportedLngs = ['en', 'ru-RU']
const resources = ns.reduce((acc, n) => {
    supportedLngs.forEach((lng) => {
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
        //debug: true,
        lng: 'en',
        fallbackLng: 'ru-RU',
        ns,
        react: { useSuspense: false },
        supportedLngs,
        resources,
    })

export default i18n
