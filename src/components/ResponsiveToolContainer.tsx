import React, { ReactNode } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { useTranslation } from 'react-i18next';

interface ResponsiveToolContainerProps {
  toolName?: string;
  title?: string;
  description?: string;
  usage: string;
  children: ReactNode;
}

export default function ResponsiveToolContainer({ 
  toolName,
  title, 
  description, 
  usage, 
  children 
}: ResponsiveToolContainerProps) {
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  
  // Use translations if toolName is provided, otherwise fall back to direct title/description
  const toolTitle = title || (toolName ? t(`tools.${toolName.toLowerCase()}.title`) : '');
  const toolDescription = description || (toolName ? t(`tools.${toolName.toLowerCase()}.description`) : '');
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{toolTitle}</h2>
      
      {/* Info box - collapsible on mobile */}
      <details className="mb-4 rounded overflow-hidden">
        <summary className={`p-3 cursor-pointer ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-blue-50 text-blue-900'} font-medium`}>
          {t('common.toolinformation')}
        </summary>
        <div className={`p-4 border-t ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-blue-50 border-blue-200'}`}>
          <p className="mb-2"><strong>{t('common.whatitdoes')}:</strong> {toolDescription}</p>
          <p><strong>{t('common.howtouse')}:</strong> {usage}</p>
        </div>
      </details>
      
      {/* Tool content with responsive styling */}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
