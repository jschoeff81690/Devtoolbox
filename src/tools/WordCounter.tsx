import React, { useState, useEffect } from 'react';
import ToolLayout from '../components/ToolLayout';
import ResponsiveToolContainer from '../components/ResponsiveToolContainer';
import { useDarkMode } from '../context/DarkModeContext';

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
}

export default function WordCounter() {
  const { darkMode } = useDarkMode();
  const [text, setText] = useState('');
  const [stats, setStats] = useState<TextStats>({
    characters: 0,
    charactersNoSpaces: 0,
    words: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0
  });

  // Calculate text statistics
  useEffect(() => {
    if (!text) {
      setStats({
        characters: 0,
        charactersNoSpaces: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0
      });
      return;
    }

    // Count characters
    const characters = text.length;
    
    // Count characters without spaces
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    
    // Count words
    const words = text.trim().split(/\s+/).filter(word => word.length > 0).length;
    
    // Count sentences (simple approximation)
    const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
    
    // Count paragraphs
    const paragraphs = text.split(/\n+/).filter(para => para.trim().length > 0).length;
    
    // Calculate reading time (average reading speed: 200 words per minute)
    const readingTime = Math.max(1, Math.ceil(words / 200));

    setStats({
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      readingTime
    });
  }, [text]);

  // Handle text input change
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  // Clear text
  const handleClear = () => {
    setText('');
  };

  // Sample text for demonstration
  const handleSampleText = () => {
    setText(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

How quickly daft jumping zebras vex! The five boxing wizards jump quickly.`);
  };

  return (
    <ToolLayout
      title="Word Counter"
      metaContent="Count words, characters, sentences, and get detailed text statistics."
      path="word-counter"
    >
      <ResponsiveToolContainer
        title="Word Counter & Text Analyzer"
        description="Count words, characters, sentences, and get detailed text statistics."
        usage="Paste or type your text in the box below to see real-time statistics about your content."
      >
        {/* Text Input Area */}
        <div className="mb-4">
          <textarea
            rows={10}
            className={`w-full p-3 border rounded font-sans text-sm ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            value={text}
            onChange={handleTextChange}
            placeholder="Type or paste your text here..."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleClear}
            className={`px-4 py-2 rounded text-sm ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            Clear Text
          </button>
          <button
            onClick={handleSampleText}
            className={`px-4 py-2 rounded text-sm ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            Sample Text
          </button>
        </div>

        {/* Statistics Display */}
        <div className={`rounded-lg border ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium">Text Statistics</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            <div className={`p-3 rounded ${
              darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="text-sm opacity-75">Characters</div>
              <div className="text-2xl font-semibold">{stats.characters}</div>
            </div>
            
            <div className={`p-3 rounded ${
              darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="text-sm opacity-75">Characters (no spaces)</div>
              <div className="text-2xl font-semibold">{stats.charactersNoSpaces}</div>
            </div>
            
            <div className={`p-3 rounded ${
              darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="text-sm opacity-75">Words</div>
              <div className="text-2xl font-semibold">{stats.words}</div>
            </div>
            
            <div className={`p-3 rounded ${
              darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="text-sm opacity-75">Sentences</div>
              <div className="text-2xl font-semibold">{stats.sentences}</div>
            </div>
            
            <div className={`p-3 rounded ${
              darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="text-sm opacity-75">Paragraphs</div>
              <div className="text-2xl font-semibold">{stats.paragraphs}</div>
            </div>
            
            <div className={`p-3 rounded ${
              darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'
            }`}>
              <div className="text-sm opacity-75">Reading Time</div>
              <div className="text-2xl font-semibold">{stats.readingTime} min</div>
            </div>
          </div>
        </div>
      </ResponsiveToolContainer>
    </ToolLayout>
  );
}
