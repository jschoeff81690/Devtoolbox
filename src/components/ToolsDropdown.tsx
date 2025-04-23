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
  const [activeView, setActiveView] = useState<'categories' | 'all'>('categories');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Get all categories except 'All'
  const categories = getAllCategories().filter(cat => cat !== 'All');
  
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

  // Get tools for a specific category without duplicates
  const getToolsForCategory = (category: string) => {
    return tools.filter(tool => tool.categories.includes(category));
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
          className={`absolute left-0 z-10 mt-2 w-64 origin-top-left rounded-md shadow-lg ${
            darkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="py-1">
            {/* View switcher */}
            <div className="flex border-b mb-1 px-2 py-1">
              <button 
                className={`flex-1 text-center text-sm py-1 rounded-l ${
                  activeView === 'categories' 
                    ? darkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-blue-100 text-blue-800' 
                    : darkMode 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveView('categories')}
              >
                By Category
              </button>
              <button 
                className={`flex-1 text-center text-sm py-1 rounded-r ${
                  activeView === 'all' 
                    ? darkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-blue-100 text-blue-800' 
                    : darkMode 
                      ? 'text-gray-300 hover:bg-gray-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveView('all')}
              >
                All Tools
              </button>
            </div>
            
            {activeView === 'categories' ? (
              // Category view
              <>
                {categories.map(category => {
                  const categoryTools = getToolsForCategory(category);
                  if (categoryTools.length === 0) return null;
                  
                  return (
                    <div key={category} className="py-1">
                      <div className={`px-4 py-1 text-xs font-semibold ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {category}
                      </div>
                      {categoryTools.map(tool => (
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
                  );
                })}
              </>
            ) : (
              // All tools view (alphabetically sorted)
              <div className="py-1">
                {[...tools]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map(tool => (
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
                  ))
                }
              </div>
            )}
            
            <div className={`my-1 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
            
            <Link 
              to="/tools" 
              className={`block px-4 py-2 text-sm font-medium ${
                darkMode 
                  ? 'text-gray-100 hover:bg-gray-700' 
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
              onClick={handleSelect}
            >
              View All Tools
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
