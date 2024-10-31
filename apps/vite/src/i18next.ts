import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const languages = ['en', 'ne'];
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next) // bind react-i18next to the instance
  .init({
    fallbackLng: 'en',
    debug: true,
    // whitelist: languages,
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    supportedLngs: languages,
  });

export default i18n;
