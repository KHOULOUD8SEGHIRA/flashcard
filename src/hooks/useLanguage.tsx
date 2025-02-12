/**
 * Language context and hook for internationalization support.
 * Provides language switching functionality and translation lookup.
 * 
 * Features:
 * - Dynamic YAML translation file loading
 * - Language context provider
 * - Translation lookup function
 * - TypeScript type safety
 * 
 * Usage:
 * 1. Wrap your app with LanguageProvider
 * 2. Use useLanguage hook to access translations
 * 3. Call t('key.path') to get translated text
 */

import { useState, createContext, useContext, useEffect } from 'react';
import yaml from 'js-yaml';

type Language = 'en' | 'zh';
type Translations = Record<string, any>;

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}>(null!);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Translations>({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${language}/app.yaml`);
        const text = await response.text();
        setTranslations(yaml.load(text) as Translations);
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };

    loadTranslations();
  }, [language]);

  const t = (key: string): string => {
    return key.split('.').reduce((obj, keyPart) => 
      (obj && obj[keyPart] !== undefined) ? obj[keyPart] : key,
    translations);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
