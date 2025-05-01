import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../i18n'

type Language = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'hi' | 'uk'

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  languages: { code: Language; name: string }[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const { i18n } = useTranslation()
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language')
    return (savedLanguage as Language) || 'en'
  })

  const languages = [
    { code: 'en' as Language, name: 'English' },
    { code: 'es' as Language, name: 'Español' },
    { code: 'fr' as Language, name: 'Français' },
    { code: 'de' as Language, name: 'Deutsch' },
    { code: 'zh' as Language, name: '中文' },
    { code: 'ja' as Language, name: '日本語' },
    { code: 'hi' as Language, name: 'हिन्दी' },
    { code: 'uk' as Language, name: 'Українська' }
  ]

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    i18n.changeLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
