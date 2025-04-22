import React, { useState, useEffect, useRef } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

interface LineNumberedEditorProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  language?: 'json' | 'html' | 'css' | 'markdown' | 'text';
  height?: string;
  showLineNumbers?: boolean;
  className?: string;
}

const LineNumberedEditor: React.FC<LineNumberedEditorProps> = ({
  value,
  onChange,
  placeholder = '',
  readOnly = false,
  language = 'text',
  height = '300px',
  showLineNumbers = true,
  className = '',
}) => {
  const { darkMode } = useDarkMode();
  const [lineCount, setLineCount] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Calculate line count when value changes
  useEffect(() => {
    const lines = (value || '').split('\n').length;
    setLineCount(lines);
  }, [value]);

  // Sync scroll position between textarea and line numbers
  useEffect(() => {
    const textarea = textareaRef.current;
    const lineNumbers = lineNumbersRef.current;
    
    if (!textarea || !lineNumbers || !showLineNumbers) return;
    
    const handleScroll = () => {
      lineNumbers.scrollTop = textarea.scrollTop;
    };
    
    textarea.addEventListener('scroll', handleScroll);
    return () => textarea.removeEventListener('scroll', handleScroll);
  }, [showLineNumbers]);

  // Handle tab key in the editor
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab' && !readOnly) {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      
      // Insert tab at cursor position
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      if (onChange) {
        onChange(newValue);
      }
      
      // Move cursor after the inserted tab
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  // Generate line numbers
  const renderLineNumbers = () => {
    return Array.from({ length: lineCount }, (_, i) => i + 1).map((num) => (
      <div key={num} className="select-none">
        {num}
      </div>
    ));
  };

  // Determine syntax highlighting class based on language
  const getSyntaxClass = () => {
    switch (language) {
      case 'json':
        return 'font-mono';
      case 'html':
        return 'font-mono';
      case 'css':
        return 'font-mono';
      case 'markdown':
        return 'font-mono';
      default:
        return '';
    }
  };

  return (
    <div 
      className={`relative border rounded overflow-hidden ${className}`}
      style={{ height }}
    >
      {showLineNumbers && (
        <div
          ref={lineNumbersRef}
          className={`absolute left-0 top-0 bottom-0 w-10 text-right overflow-hidden py-2 px-1 select-none
            ${darkMode ? 'bg-gray-800 text-gray-500 border-r border-gray-700' : 'bg-gray-100 text-gray-500 border-r border-gray-300'}`}
          style={{ overflowY: 'hidden' }}
        >
          {renderLineNumbers()}
        </div>
      )}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full h-full resize-none p-2 outline-none ${getSyntaxClass()}
          ${showLineNumbers ? 'pl-12' : 'pl-2'}
          ${darkMode 
            ? 'bg-gray-900 text-gray-100 placeholder-gray-500' 
            : 'bg-white text-gray-900 placeholder-gray-400'}
          ${readOnly ? 'cursor-default' : ''}`}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        data-language={language}
      />
    </div>
  );
};

export default LineNumberedEditor;
