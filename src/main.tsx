import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './i18n'
import { HelmetProvider } from 'react-helmet-async';
import { DarkModeProvider } from './context/DarkModeContext';
import { SearchProvider } from './context/SearchContext';
import { LanguageProvider } from './context/LanguageContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <DarkModeProvider>
          <LanguageProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </LanguageProvider>
        </DarkModeProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
)

