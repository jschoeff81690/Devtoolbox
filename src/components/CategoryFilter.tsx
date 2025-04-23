import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

export type ToolCategory = 
  | 'All' 
  | 'Text' 
  | 'Code' 
  | 'Conversion' 
  | 'Generator' 
  | 'Formatter' 
  | 'Utility'
  | 'Design'
  | 'Analyzer'
  | 'Web'
  | 'Security'
  | 'Developer';

interface CategoryFilterProps {
  selectedCategory: ToolCategory;
  setSelectedCategory: (category: ToolCategory) => void;
  categories: ToolCategory[];
}

export default function CategoryFilter({ 
  selectedCategory, 
  setSelectedCategory, 
  categories 
}: CategoryFilterProps) {
  const { darkMode } = useDarkMode();
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-3 py-1 text-sm rounded-full transition-colors ${
            selectedCategory === category
              ? darkMode
                ? 'bg-blue-600 text-white'
                : 'bg-blue-500 text-white'
              : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
