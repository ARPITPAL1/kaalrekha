"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Language, translations, Translations } from "@/data/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "or",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: translations.or,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to Odia ("or") as requested by user
  const [language, setLanguageState] = useState<Language>("or");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("historia_language") as Language | null;
    if (savedLang === "en" || savedLang === "or") {
      setLanguageState(savedLang);
    } else {
      // Set Odia as default
      setLanguageState("or");
      localStorage.setItem("historia_language", "or");
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("historia_language", lang);
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === "or" ? "en" : "or";
    setLanguage(nextLang);
  };

  const currentTranslations = translations[language] || translations.or;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: currentTranslations,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
