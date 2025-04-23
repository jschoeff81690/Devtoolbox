import { ReactNode, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDarkMode } from '../context/DarkModeContext'
import { MoonIcon, SunIcon, MenuIcon, CloseIcon } from './Icons'
import ToolsDropdown from './ToolsDropdown'
import { tools } from '../data/toolsData'

export default function Layout({ children }: { children: ReactNode }) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark:bg-gray-900 dark:text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header
          className="border-b px-4 sm:px-6 py-4 flex items-center justify-between"
          style={{ backgroundColor: 'rgb(4, 44, 68)' }}
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-blue-100">
              <img src={`${import.meta.env.BASE_URL}devtoolbox-logo.png`} alt="Devtoolbox logo" className="h-8 w-8 rounded" />
              <span className="hidden sm:inline">Devtoolbox</span>
            </Link>
            <div className="hidden sm:block">
              <ToolsDropdown />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-blue-100 hover:text-white hover:bg-blue-800"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </button>
            
            {/* Mobile menu button */}
            <button
              className="sm:hidden p-2 rounded-full text-blue-100 hover:text-white hover:bg-blue-800"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </header>
        
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className={`sm:hidden ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'} border-b`}>
          <div className="px-4 py-3 space-y-1">
            <Link 
              to="/tools" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'text-gray-100 hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              All Tools
            </Link>
            
            <div className={`my-1 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
            
            {/* Mobile tool links */}
            {tools.map(tool => (
              <Link
                key={tool.path}
                to={tool.path}
                className={`block px-3 py-2 rounded-md text-sm ${
                  darkMode 
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {tool.name}
              </Link>
            ))}
            
            <div className={`my-1 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
            
            {/* Mobile page links */}
            <Link 
              to="/about" 
              className={`block px-3 py-2 rounded-md text-sm ${
                darkMode 
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`block px-3 py-2 rounded-md text-sm ${
                darkMode 
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/privacy" 
              className={`block px-3 py-2 rounded-md text-sm ${
                darkMode 
                  ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      )}
      
      {/* Main Layout */}
      <div className="flex flex-1">

        {/* Main Content */}
        <main className={`flex-1 p-2 sm:p-4 ${darkMode ? 'dark:bg-gray-900' : ''}`}>{children}</main>

        {/* Right Sidebar (ads) */}
        <aside className={`w-1/6 hidden lg:block border-l p-4 text-sm ${darkMode ? 'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400' : 'text-gray-500'}`}>
          <p>Ad space</p>
        </aside>
      </div>

      {/* Footer */}
      <footer className={`border-t px-4 sm:px-6 py-4 text-center ${darkMode ? 'dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400' : 'bg-white text-gray-500'}`}>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
          <div>&copy; {new Date().getFullYear()} Devtoolbox. All rights reserved.</div>
          <div className="flex gap-4">
            <Link 
              to="/about" 
              className={`hover:underline ${darkMode ? 'hover:text-gray-300' : 'hover:text-gray-700'}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`hover:underline ${darkMode ? 'hover:text-gray-300' : 'hover:text-gray-700'}`}
            >
              Contact
            </Link>
            <Link 
              to="/privacy" 
              className={`hover:underline ${darkMode ? 'hover:text-gray-300' : 'hover:text-gray-700'}`}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
