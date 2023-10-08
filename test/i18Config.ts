import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import {
    defaultLanguage,
    fallbackLanguage,
} from '../src/shared/config/i18n/const'

i18n.use(initReactI18next).init({
    lng: defaultLanguage,
    fallbackLng: fallbackLanguage,
    // have a common namespace used around the full app
    debug: false,
})

export default i18n
