import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { HelmetProvider } from 'react-helmet-async';
import { DarkModeProvider } from './context/DarkModeContext';
import { SearchProvider } from './context/SearchContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <DarkModeProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </DarkModeProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
)

