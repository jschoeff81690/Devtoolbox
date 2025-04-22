import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { ChevronDownIcon, ChevronUpIcon } from './Icons';
import { tools, getAllCategories } from '../data/toolsData';

interface ToolsDropdownProps {
  onSelect?: () => void;
  className?: string;
}

export default function ToolsDropdown({ onSelect, className = '' }: ToolsDropdownProps) {
  const { darkMode } = useDarkMode();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Group tools by category
  const categories = getAllCategories().filter(cat => cat !== 'All');
  const toolsByCategory = categories.map(category => ({
    category,
    tools: tools.filter(tool => tool.categories.includes(category))
  }));
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSelect = () => {
    setIsOpen(false);
    if (onSelect) onSelect();
  };
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-blue-100 hover:text-white text-sm font-medium"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Tools
        {isOpen ? (
          <ChevronUpIcon className="h-4 w-4" />
        ) : (
          <ChevronDownIcon className="h-4 w-4" />
        )}
      </button>
      
      {isOpen && (
        <div 
          className={`absolute left-0 z-10 mt-2 w-60 origin-top-left rounded-md shadow-lg ${
            darkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="py-1">
            <Link 
              to="/tools" 
              className={`block px-4 py-2 text-sm font-medium ${
                darkMode 
                  ? 'text-gray-100 hover:bg-gray-700' 
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
              onClick={handleSelect}
            >
              All Tools
            </Link>
            
            <div className={`my-1 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
            
            {toolsByCategory.map(({ category, tools }) => (
              <div key={category} className="py-1">
                <div className={`px-4 py-1 text-xs font-semibold ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {category}
                </div>
                {tools.map(tool => (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    className={`block px-4 py-2 text-sm ${
                      darkMode 
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    onClick={handleSelect}
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
