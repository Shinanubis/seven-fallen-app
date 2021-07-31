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
    lng: JSON.parse(localStorage.getItem("7fallen")) ? JSON.parse(localStorage.getItem("7fallen")).lang : "fr",
    fallbackLng: "fr",
  
    interpolation: {
      escapeValue: false
    }
  });
  
  export default i18n;