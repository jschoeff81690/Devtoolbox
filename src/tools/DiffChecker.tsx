import React, { useState, useEffect } from 'react';
import { diffLines, Change } from 'diff';
import ToolLayout from '../components/ToolLayout';
import ResponsiveToolContainer from '../components/ResponsiveToolContainer';
import LineNumberedEditor from '../components/LineNumberedEditor';
import { useDarkMode } from '../context/DarkModeContext';

export default function DiffChecker() {
  const { darkMode } = useDarkMode();
  const [leftText, setLeftText] = useState('');
  const [rightText, setRightText] = useState('');
  const [diffResult, setDiffResult] = useState<Change[]>([]);
  const [diffView, setDiffView] = useState<'side-by-side' | 'inline'>('side-by-side');
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);

  // Generate diff when text changes
  useEffect(() => {
    if (leftText || rightText) {
      let leftCompare = leftText;
      let rightCompare = rightText;
      
      if (ignoreCase) {
        leftCompare = leftCompare.toLowerCase();
        rightCompare = rightCompare.toLowerCase();
      }
      
      if (ignoreWhitespace) {
        leftCompare = leftCompare.replace(/\s+/g, ' ').trim();
        rightCompare = rightCompare.replace(/\s+/g, ' ').trim();
      }
      
      const diff = diffLines(leftCompare, rightCompare);
      setDiffResult(diff);
    } else {
      setDiffResult([]);
    }
  }, [leftText, rightText, ignoreCase, ignoreWhitespace]);

  const loadSampleData = () => {
    setLeftText(`function calculateTotal(items) {
  return items
    .map(item => item.price * item.quantity)
    .reduce((total, value) => total + value, 0);
}

// Example usage
const cart = [
  { name: 'Widget', price: 9.99, quantity: 2 },
  { name: 'Gadget', price: 14.99, quantity: 1 }
];
const total = calculateTotal(cart);
console.log('Total: $' + total);`);

    setRightText(`function calculateTotal(items) {
  return items
    .map(item => item.price * item.quantity)
    .reduce((total, value) => total + value, 0)
    .toFixed(2); // Format to 2 decimal places
}

// Example usage
const cart = [
  { name: 'Widget', price: 9.99, quantity: 2 },
  { name: 'Gadget', price: 14.99, quantity: 1 },
  { name: 'Accessory', price: 4.99, quantity: 3 }
];
const total = calculateTotal(cart);
console.log('Total: $' + total);`);
  };

  const clearAll = () => {
    setLeftText('');
    setRightText('');
    setDiffResult([]);
  };

  // Render the diff view
  const renderDiff = () => {
    if (!diffResult.length) {
      return (
        <div className={`flex items-center justify-center h-64 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Enter text in both panels to see the differences
        </div>
      );
    }

    if (diffView === 'inline') {
      return renderInlineDiff();
    } else {
      return renderSideBySideDiff();
    }
  };

  // Render side-by-side diff view
  const renderSideBySideDiff = () => {
    let leftLineNumber = 1;
    let rightLineNumber = 1;
    
    const leftLines: JSX.Element[] = [];
    const rightLines: JSX.Element[] = [];
    
    diffResult.forEach((part, index) => {
      const lines = part.value.split('\n');
      // Remove the last empty line that comes from splitting
      if (lines[lines.length - 1] === '') lines.pop();
      
      lines.forEach((line, i) => {
        const lineClass = part.added 
          ? 'bg-green-100 dark:bg-green-900/30' 
          : part.removed 
            ? 'bg-red-100 dark:bg-red-900/30' 
            : '';
            
        if (!part.added) {
          leftLines.push(
            <div 
              key={`left-${index}-${i}`} 
              className={`px-2 ${lineClass} ${part.removed ? 'line-through text-red-600 dark:text-red-400' : ''}`}
            >
              {showLineNumbers && (
                <span className="inline-block w-8 text-right mr-2 text-gray-400 select-none">
                  {leftLineNumber++}
                </span>
              )}
              {line || ' '}
            </div>
          );
        }
        
        if (!part.removed) {
          rightLines.push(
            <div 
              key={`right-${index}-${i}`} 
              className={`px-2 ${lineClass} ${part.added ? 'text-green-600 dark:text-green-400' : ''}`}
            >
              {showLineNumbers && (
                <span className="inline-block w-8 text-right mr-2 text-gray-400 select-none">
                  {rightLineNumber++}
                </span>
              )}
              {line || ' '}
            </div>
          );
        }
      });
    });
    
    return (
      <div className="flex flex-col md:flex-row gap-4">
        <div className={`flex-1 border rounded overflow-auto ${
          darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300'
        }`}>
          <div className={`sticky top-0 px-2 py-1 text-sm font-medium ${
            darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
          }`}>
            Original Text
          </div>
          <div className="font-mono text-sm whitespace-pre">
            {leftLines}
          </div>
        </div>
        <div className={`flex-1 border rounded overflow-auto ${
          darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300'
        }`}>
          <div className={`sticky top-0 px-2 py-1 text-sm font-medium ${
            darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
          }`}>
            Modified Text
          </div>
          <div className="font-mono text-sm whitespace-pre">
            {rightLines}
          </div>
        </div>
      </div>
    );
  };

  // Render inline diff view
  const renderInlineDiff = () => {
    let lineNumber = 1;
    const lines: JSX.Element[] = [];
    
    diffResult.forEach((part, index) => {
      const partLines = part.value.split('\n');
      // Remove the last empty line that comes from splitting
      if (partLines[partLines.length - 1] === '') partLines.pop();
      
      partLines.forEach((line, i) => {
        const lineClass = part.added 
          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
          : part.removed 
            ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
            : '';
            
        lines.push(
          <div 
            key={`line-${index}-${i}`} 
            className={`px-2 ${lineClass} ${part.removed ? 'line-through' : ''}`}
          >
            {showLineNumbers && (
              <span className="inline-block w-8 text-right mr-2 text-gray-400 select-none">
                {lineNumber++}
              </span>
            )}
            {line || ' '}
          </div>
        );
      });
    });
    
    return (
      <div className={`border rounded overflow-auto ${
        darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-300'
      }`}>
        <div className={`sticky top-0 px-2 py-1 text-sm font-medium ${
          darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-700'
        }`}>
          Differences
        </div>
        <div className="font-mono text-sm whitespace-pre">
          {lines}
        </div>
      </div>
    );
  };

  return (
    <ToolLayout
      title="Diff Checker"
      metaContent="Compare two texts and highlight the differences between them."
      path="diff-checker"
    >
      <ResponsiveToolContainer
        title="Diff Checker"
        description="Compare two texts and highlight the differences between them."
        usage="Enter or paste text in both panels, then view the differences highlighted below."
      >
        <div className="flex flex-wrap gap-4 mb-4">
          <button
            onClick={loadSampleData}
            className="px-3 py-1 text-sm rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Load Sample
          </button>
          <button
            onClick={clearAll}
            className="px-3 py-1 text-sm rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Clear All
          </button>
          
          <div className="flex items-center ml-auto">
            <label className="flex items-center mr-4 text-sm">
              <input
                type="checkbox"
                checked={ignoreCase}
                onChange={(e) => setIgnoreCase(e.target.checked)}
                className="mr-1"
              />
              Ignore Case
            </label>
            <label className="flex items-center mr-4 text-sm">
              <input
                type="checkbox"
                checked={ignoreWhitespace}
                onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                className="mr-1"
              />
              Ignore Whitespace
            </label>
            <label className="flex items-center mr-4 text-sm">
              <input
                type="checkbox"
                checked={showLineNumbers}
                onChange={(e) => setShowLineNumbers(e.target.checked)}
                className="mr-1"
              />
              Line Numbers
            </label>
            <select
              value={diffView}
              onChange={(e) => setDiffView(e.target.value as 'side-by-side' | 'inline')}
              className={`text-sm rounded px-2 py-1 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-gray-50 border border-gray-300 text-gray-900'
              }`}
            >
              <option value="side-by-side">Side by Side</option>
              <option value="inline">Inline</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2">Original Text</h3>
            <LineNumberedEditor
              value={leftText}
              onChange={setLeftText}
              placeholder="Enter or paste original text here..."
              language="plaintext"
              height="250px"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2">Modified Text</h3>
            <LineNumberedEditor
              value={rightText}
              onChange={setRightText}
              placeholder="Enter or paste modified text here..."
              language="plaintext"
              height="250px"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Differences</h3>
          <div className="h-[400px] overflow-auto">
            {renderDiff()}
          </div>
        </div>
      </ResponsiveToolContainer>
    </ToolLayout>
  );
}
