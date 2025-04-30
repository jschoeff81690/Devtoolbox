import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { useSearch } from '../context/SearchContext';
import CategoryFilter, { ToolCategory } from '../components/CategoryFilter';
import { tools, getAllCategories } from '../data/toolsData';
import { useTranslation } from 'react-i18next';

export default function Tools() {
  const { darkMode } = useDarkMode();
  const { searchTerm, setSearchTerm } = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('All');
  const { t } = useTranslation();
  
  const categories = useMemo(() => getAllCategories(), []);
  
  // Clear search when component mounts (when navigating back to tools)
  useEffect(() => {
    // Only clear if we're coming from a tool page, not from initial search
    const fromToolPage = document.referrer.includes(window.location.origin) && 
                         !document.referrer.includes('/tools');
    
    if (fromToolPage) {
      setSearchTerm('');
    }
  }, [setSearchTerm]);
  
  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      // Get translated name and description
      const toolKey = tool.path.substring(1).replace(/-/g, '');
      const translatedName = t(`tools.${toolKey}.title`);
      const translatedDescription = t(`tools.${toolKey}.description`);
      
      // Filter by search term
      const matchesSearch = 
        translatedName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        translatedDescription.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by category
      const matchesCategory = 
        selectedCategory === 'All' || 
        tool.categories.includes(selectedCategory);
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, t]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">{t('pages.tools.title')}</h1>
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
              key={tool.path} 
              className={`p-4 border rounded-lg ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              } shadow-sm hover:shadow-md transition`}
            >
              <Link to={tool.path} className={`text-xl ${darkMode ? 'text-blue-400' : 'text-custom-dark-blue'} font-semibold hover:underline`}>
                {t(`tools.${tool.path.substring(1).replace(/-/g, '')}.title`)}
              </Link>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mt-1`}>
                {t(`tools.${tool.path.substring(1).replace(/-/g, '')}.description`)}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {tool.categories.map(category => (
                  <span 
                    key={`${tool.path}-${category}`}
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      darkMode 
                        ? 'bg-gray-700 text-gray-300' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {t(`categories.${category.toLowerCase()}`)}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <p className="text-lg font-medium">{t('pages.tools.notoolsfound')}</p>
          <p className="mt-2">{t('pages.tools.adjustsearch')}</p>
        </div>
      )}
    </div>
  );
}
