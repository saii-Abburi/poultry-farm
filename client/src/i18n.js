import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "Premium Poultry Farm Products": "Premium Poultry Farm Products",
      "Healthy hens, strong cocks, fresh eggs, and quality chicks directly from our farm.": "Healthy hens, strong cocks, fresh eggs, and quality chicks directly from our farm.",
      "View Products": "View Products",
      "Categories": "Categories",
      "Hens": "Hens",
      "Cocks": "Cocks",
      "Chicks": "Chicks",
      "Eggs": "Eggs",
      "Latest Products": "Latest Products",
      "Contact Us": "Contact Us",
      "Quick Links": "Quick Links",
      "Location": "Location",
      "Order Now": "ORDER ON WHATSAPP"
    }
  },
  te: {
    translation: {
      "Premium Poultry Farm Products": "ప్రీమియం పౌల్ట్రీ ఫామ్ ఉత్పత్తులు",
      "Healthy hens, strong cocks, fresh eggs, and quality chicks directly from our farm.": "మా ఫామ్ నుండి నేరుగా ఆరోగ్యకరమైన కోళ్లు, బలమైన కోడిపుంజులు, తాజా గుడ్లు మరియు నాణ్యమైన కోడిపిల్లలు.",
      "View Products": "ఉత్పత్తులను చూడండి",
      "Categories": "వర్గాలు",
      "Hens": "కోళ్లు",
      "Cocks": "కోడిపుంజులు",
      "Chicks": "కోడిపిల్లలు",
      "Eggs": "గుడ్లు",
      "Latest Products": "తాజా ఉత్పత్తులు",
      "Contact Us": "మమ్మల్ని సంప్రదించండి",
      "Quick Links": "వేగవంతమైన లింకులు",
      "Location": "స్థానం",
      "Order Now": "వాట్సాప్‌లో ఆర్డర్ చేయండి"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
