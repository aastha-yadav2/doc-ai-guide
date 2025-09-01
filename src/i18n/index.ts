import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from '../../public/locales/en.json';
import hiTranslations from '../../public/locales/hi.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en', // default language
    fallbackLng: 'en',
    
    resources: {
      en: {
        translation: enTranslations
      },
      hi: {
        translation: hiTranslations
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