import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import ResponsiveToolContainer from '../components/ResponsiveToolContainer';
import { useDarkMode } from '../context/DarkModeContext';
import { useTranslation } from 'react-i18next'

// Import crypto-js components
import MD5 from 'crypto-js/md5';
import SHA1 from 'crypto-js/sha1';
import SHA256 from 'crypto-js/sha256';
import SHA512 from 'crypto-js/sha512';
import SHA3 from 'crypto-js/sha3';
import RIPEMD160 from 'crypto-js/ripemd160';

type HashAlgorithm = 'md5' | 'sha1' | 'sha256' | 'sha512' | 'sha3' | 'ripemd160';

interface HashResult {
  algorithm: HashAlgorithm;
  hash: string;
}

export default function HashGenerator() {
  const { darkMode } = useDarkMode();
  const [input, setInput] = useState('');
  const [results, setResults] = useState<HashResult[]>([]);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState<HashAlgorithm[]>([
    'md5', 'sha1', 'sha256'
  ]);
  const [copied, setCopied] = useState<string | null>(null);
  const { t } = useTranslation()
  const toolName = 'hashgenerator'

  // Available hash algorithms
  const algorithms: { value: HashAlgorithm; label: string; description: string }[] = [
    { 
      value: 'md5', 
      label: 'MD5', 
      description: 'Fast but insecure, 128-bit hash. Not suitable for security purposes.'
    },
    { 
      value: 'sha1', 
      label: 'SHA-1', 
      description: '160-bit hash. Deprecated for security purposes.'
    },
    { 
      value: 'sha256', 
      label: 'SHA-256', 
      description: '256-bit hash from SHA-2 family. Good security.'
    },
    { 
      value: 'sha512', 
      label: 'SHA-512', 
      description: '512-bit hash from SHA-2 family. Excellent security.'
    },
    { 
      value: 'sha3', 
      label: 'SHA-3', 
      description: 'Latest SHA standard, 512-bit hash.'
    },
    { 
      value: 'ripemd160', 
      label: 'RIPEMD-160', 
      description: '160-bit hash, alternative to SHA.'
    }
  ];

  // Toggle algorithm selection
  const toggleAlgorithm = (algorithm: HashAlgorithm) => {
    if (selectedAlgorithms.includes(algorithm)) {
      setSelectedAlgorithms(selectedAlgorithms.filter(a => a !== algorithm));
    } else {
      setSelectedAlgorithms([...selectedAlgorithms, algorithm]);
    }
  };

  // Generate hashes
  const generateHashes = () => {
    if (!input.trim()) {
      return;
    }

    const newResults: HashResult[] = [];

    selectedAlgorithms.forEach(algorithm => {
      let hash = '';
      
      switch (algorithm) {
        case 'md5':
          hash = MD5(input).toString();
          break;
        case 'sha1':
          hash = SHA1(input).toString();
          break;
        case 'sha256':
          hash = SHA256(input).toString();
          break;
        case 'sha512':
          hash = SHA512(input).toString();
          break;
        case 'sha3':
          hash = SHA3(input).toString();
          break;
        case 'ripemd160':
          hash = RIPEMD160(input).toString();
          break;
      }

      newResults.push({ algorithm, hash });
    });

    setResults(newResults);
  };

  // Copy hash to clipboard
  const copyToClipboard = (hash: string, algorithm: string) => {
    navigator.clipboard.writeText(hash);
    setCopied(algorithm);
    setTimeout(() => setCopied(null), 2000);
  };

  // Clear all
  const clearAll = () => {
    setInput('');
    setResults([]);
  };

  // Sample text
  const useSampleText = () => {
    setInput('Hello, world!');
  };

  return (
    <ToolLayout
      toolName={toolName}
      path="hash-generator"
    >
      <ResponsiveToolContainer
        toolName={toolName}
        usage={t(`tools.${toolName}.usage`)}
      >
        {/* Input Area */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Input Text</label>
          <textarea
            rows={5}
            className={`w-full p-3 border rounded font-mono text-sm ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
          />
        </div>

        {/* Algorithm Selection */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Hash Algorithms</label>
          <div className="flex flex-wrap gap-2">
            {algorithms.map(algorithm => (
              <button
                key={algorithm.value}
                onClick={() => toggleAlgorithm(algorithm.value)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedAlgorithms.includes(algorithm.value)
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                    : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title={algorithm.description}
              >
                {algorithm.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={generateHashes}
            disabled={!input.trim() || selectedAlgorithms.length === 0}
            className={`px-4 py-2 rounded text-sm font-medium ${
              !input.trim() || selectedAlgorithms.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                : darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {t(`tools.${toolName}.generate`)}
          </button>
          <button
            onClick={clearAll}
            className={`px-4 py-2 rounded text-sm ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {t(`tools.${toolName}.clear`)}
          </button>
          <button
            onClick={useSampleText}
            className={`px-4 py-2 rounded text-sm ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            {t(`tools.${toolName}.sample`)}
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className={`rounded-lg border ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
          }`}>
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-medium">Hash Results</h3>
            </div>
            
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {results.map((result) => {
                const algorithm = algorithms.find(a => a.value === result.algorithm);
                
                return (
                  <div key={result.algorithm} className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-medium">{algorithm?.label}</span>
                        <span className="text-xs ml-2 opacity-75">{algorithm?.description}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(result.hash, result.algorithm)}
                        className={`text-xs px-2 py-1 rounded ${
                          darkMode 
                            ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                        }`}
                      >
                        {copied === result.algorithm ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div 
                      className={`font-mono text-sm p-2 rounded break-all ${
                        darkMode ? 'bg-gray-700' : 'bg-white border border-gray-200'
                      }`}
                    >
                      {result.hash}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className={`mt-6 p-4 rounded-lg ${
          darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-700'
        }`}>
          <h3 className="text-lg font-medium mb-2">{t(`tools.${toolName}.about`)}</h3>
          <p className="text-sm mb-2">
            {t(`tools.${toolName}.about`)}
          </p>
          <ul className="list-disc list-inside text-sm space-y-1 mb-2">
            <li>One-way (impossible to reverse)</li>
            <li>Deterministic (same input always produces same output)</li>
            <li>Fast to compute</li>
            <li>Resistant to collisions (different inputs producing same hash)</li>
          </ul>
          <p className="text-sm">
            <strong>{t(`tools.${toolName}.securitynote`)}:</strong> {t(`tools.${toolName}.hashwarning`)}
          </p>
        </div>
      </ResponsiveToolContainer>
    </ToolLayout>
  );
}
