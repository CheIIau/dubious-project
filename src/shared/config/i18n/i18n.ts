import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import I18NextHttpBackend, { HttpBackendOptions } from 'i18next-http-backend'
import {fallbackLanguage, defaultLanguage} from './const'

i18n.use(I18NextHttpBackend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init<HttpBackendOptions>({
        debug: __IS_DEV__,
        lng: defaultLanguage,
        fallbackLng: fallbackLanguage,
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    })

export default i18n
