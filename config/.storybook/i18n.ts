import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import I18NextHttpBackend, { HttpBackendOptions } from 'i18next-http-backend'
import { languages, fallbackLanguage, defaultLanguage, ns, resources } from '../../src/shared/config/i18n/const'

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
