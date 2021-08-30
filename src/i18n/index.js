import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translateEN from "./translateEN.json";
import translateFR from "./translateFR.json";

i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: translateEN
      },
      fr: {
        translation: translateFR
      }
    },
    lng: localStorage.getItem("lang") ? localStorage.getItem("lang") : "fr",
    fallbackLng: "fr",
  
    interpolation: {
      escapeValue: false
    }
  });
  
  export default i18n;