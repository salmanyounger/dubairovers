'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { translations, SUPPORTED_LANGS } from '../lib/i18n';

const LanguageContext = createContext({
  lang: 'en', setLang: () => {}, tr: () => '',
  dir: 'ltr', langs: SUPPORTED_LANGS,
  currentLang: SUPPORTED_LANGS[0],
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('dr_lang') || 'en';
    setLangState(saved);
    document.documentElement.lang = saved;
    document.documentElement.dir  = translations[saved]?.dir || 'ltr';
    if (translations[saved]?.dir === 'rtl') {
      document.body.style.fontFamily = "'Cairo', sans-serif";
    }
  }, []);

  const setLang = (code) => {
    setLangState(code);
    localStorage.setItem('dr_lang', code);
    document.documentElement.lang = code;
    document.documentElement.dir  = translations[code]?.dir || 'ltr';
    document.body.style.fontFamily = translations[code]?.font || "'Nunito', sans-serif";
  };

  const tr = (section, key) =>
    translations[lang]?.[section]?.[key] ?? translations['en']?.[section]?.[key] ?? key;

  const currentLang = SUPPORTED_LANGS.find(l => l.code === lang) || SUPPORTED_LANGS[0];

  return (
    <LanguageContext.Provider value={{
      lang, setLang, tr,
      dir: translations[lang]?.dir || 'ltr',
      langs: SUPPORTED_LANGS,
      currentLang,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
