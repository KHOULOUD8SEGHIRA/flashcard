/**
 * Language context and hook for internationalization support.
 * Provides language switching functionality and translation lookup.
 */

import { useState, createContext, useContext, useEffect } from 'react';
import yaml from 'js-yaml';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

interface LanguageList {
  languages: {
    [key: string]: Language;
  };
}

interface Translations {
  [key: string]: any;
}

interface LanguageContextType {
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  t: (key: string) => string;
  languages: {
    [key: string]: Language;
  };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState<Translations>({});
  const [languages, setLanguages] = useState<{ [key: string]: Language }>({});

  useEffect(() => {
    // Load language list
    fetch('/locales/languages.yaml')
      .then((response) => response.text())
      .then((text) => {
        const data = yaml.load(text) as LanguageList;
        setLanguages(data.languages);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    // Load translations for current language
    fetch(`/locales/${currentLanguage}/app.yaml`)
      .then((response) => response.text())
      .then((text) => {
        const data = yaml.load(text) as Translations;
        setTranslations(data);
      })
      .catch(console.error);
  }, [currentLanguage]);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setCurrentLanguage,
        t,
        languages,
      }}
    >
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
