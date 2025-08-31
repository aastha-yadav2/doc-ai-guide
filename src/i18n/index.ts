import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en', // default language
    fallbackLng: 'en',
    
    resources: {
      en: {
        translation: require('../../public/locales/en.json')
      },
      hi: {
        translation: require('../../public/locales/hi.json')
      }
    },

    interpolation: {
      escapeValue: false, // react already does escaping
    },

    react: {
      useSuspense: false,
    }
  });

export default i18n;