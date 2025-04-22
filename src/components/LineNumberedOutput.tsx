import React, { useState, useEffect, useRef } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

interface LineNumberedOutputProps {
  content: string;
  language?: 'json' | 'html' | 'css' | 'markdown' | 'text';
  height?: string;
  showLineNumbers?: boolean;
  className?: string;
  showCopyButton?: boolean;
}

const LineNumberedOutput: React.FC<LineNumberedOutputProps> = ({
  content,
  language = 'text',
  height = '300px',
  showLineNumbers = true,
  className = '',
  showCopyButton = true,
}) => {
  const { darkMode } = useDarkMode();
  const [lineCount, setLineCount] = useState(1);
  const [copySuccess, setCopySuccess] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  // Calculate line count when content changes
  useEffect(() => {
    const lines = (content || '').split('\n').length;
    setLineCount(lines);
  }, [content]);

  // Sync scroll position between pre and line numbers
  useEffect(() => {
    const pre = preRef.current;
    const lineNumbers = lineNumbersRef.current;
    
    if (!pre || !lineNumbers || !showLineNumbers) return;
    
    const handleScroll = () => {
      lineNumbers.scrollTop = pre.scrollTop;
    };
    
    pre.addEventListener('scroll', handleScroll);
    return () => pre.removeEventListener('scroll', handleScroll);
  }, [showLineNumbers]);

  // Copy content to clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
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
    <div className={`relative border rounded overflow-hidden ${className}`} style={{ height }}>
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
      
      {showCopyButton && (
        <button
          onClick={copyToClipboard}
          className={`absolute top-2 right-2 px-2 py-1 text-xs rounded z-10 transition-colors
            ${darkMode 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
          aria-label="Copy to clipboard"
        >
          {copySuccess ? 'Copied!' : 'Copy'}
        </button>
      )}
      
      <pre
        ref={preRef}
        className={`w-full h-full overflow-auto p-2 m-0 ${getSyntaxClass()}
          ${showLineNumbers ? 'pl-12' : 'pl-2'}
          ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}
        data-language={language}
      >
        <code>{content}</code>
      </pre>
    </div>
  );
};

export default LineNumberedOutput;
