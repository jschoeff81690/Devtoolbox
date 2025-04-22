import React, { ReactNode } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

interface ResponsiveToolContainerProps {
  title: string;
  description: string;
  usage: string;
  children: ReactNode;
}

export default function ResponsiveToolContainer({ 
  title, 
  description, 
  usage, 
  children 
}: ResponsiveToolContainerProps) {
  const { darkMode } = useDarkMode();
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      
      {/* Info box - collapsible on mobile */}
      <details className="mb-4 rounded overflow-hidden">
        <summary className={`p-3 cursor-pointer ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-blue-50 text-blue-900'} font-medium`}>
          Tool Information
        </summary>
        <div className={`p-4 border-t ${darkMode ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-blue-50 border-blue-200'}`}>
          <p className="mb-2"><strong>What it does:</strong> {description}</p>
          <p><strong>How to use:</strong> {usage}</p>
        </div>
      </details>
      
      {/* Tool content with responsive styling */}
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
