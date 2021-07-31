import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translateEN from "../../public/locales/translateEN.json";
import translateFR from "../../public/locales/translateFR.json";

i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: translateEN
      },
      fr: {
        translation: translateFR
      },
      indo: {
        translation: translateIN
      }
    },
    lng: "fr",
    fallbackLng: "fr",
  
    interpolation: {
      escapeValue: false
    }
  });
  
  export default i18n;