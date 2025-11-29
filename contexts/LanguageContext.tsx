'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'uz' | 'ru' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (uz: string, ru: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('uz');

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') as Language;
    if (savedLang) {
      setLangState(savedLang);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('preferredLanguage', newLang);
  };

  const t = (uz: string, ru: string, en: string): string => {
    const translations = { uz, ru, en };
    return translations[lang];
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
