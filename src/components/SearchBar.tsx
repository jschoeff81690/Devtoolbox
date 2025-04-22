import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
}

export default function SearchBar({ 
  searchTerm, 
  setSearchTerm, 
  placeholder = "Search tools..." 
}: SearchBarProps) {
  const { darkMode } = useDarkMode();
  
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg 
          className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} 
          aria-hidden="true" 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 20 20"
        >
          <path 
            stroke="currentColor" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`block w-full p-2 pl-10 text-sm rounded-lg ${
          darkMode 
            ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500' 
            : 'bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500'
        }`}
        placeholder={placeholder}
      />
      {searchTerm && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={() => setSearchTerm('')}
          aria-label="Clear search"
        >
          <svg 
            className={`w-4 h-4 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`} 
            aria-hidden="true" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 14 14"
          >
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="m1 1 12 12M1 13 13 1"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
