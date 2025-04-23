import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { useSearch } from '../context/SearchContext';
import CategoryFilter, { ToolCategory } from '../components/CategoryFilter';
import { tools, getAllCategories } from '../data/toolsData';

export default function Tools() {
  const { darkMode } = useDarkMode();
  const { searchTerm } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('All');
  
  const categories = useMemo(() => getAllCategories(), []);
  
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      // Filter by search term
      const matchesSearch = 
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by category
      const matchesCategory = 
        selectedCategory === 'All' || 
        tool.categories.includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Tools</h1>
      </div>
      
      <CategoryFilter 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
        categories={categories}
      />
      
      {filteredTools.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTools.map((tool) => (
            <li 
              key={tool.name} 
              className={`p-4 border rounded-lg ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              } shadow-sm hover:shadow-md transition`}
            >
              <Link to={tool.path} className={`text-xl ${darkMode ? 'text-blue-400' : 'text-custom-dark-blue'} font-semibold hover:underline`}>
                {tool.name}
              </Link>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mt-1`}>
                {tool.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {tool.categories.map(category => (
                  <span 
                    key={`${tool.name}-${category}`}
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      darkMode 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p className="text-lg font-medium">No tools found</p>
          <p className="mt-2">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
