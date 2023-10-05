import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'ru-RU',
    // have a common namespace used around the full app
    debug: false,
})

export default i18n
