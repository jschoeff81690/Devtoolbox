import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import ResponsiveToolContainer from '../components/ResponsiveToolContainer';
import { useDarkMode } from '../context/DarkModeContext';

export default function UrlEncoder() {
  const { darkMode } = useDarkMode();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Handle encoding
  const handleEncode = () => {
    try {
      setError('');
      const encoded = encodeURIComponent(input);
      setOutput(encoded);
    } catch (err: any) {
      setError(`Encoding error: ${err.message}`);
      setOutput('');
    }
  };

  // Handle decoding
  const handleDecode = () => {
    try {
      setError('');
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
    } catch (err: any) {
      setError(`Decoding error: ${err.message}`);
      setOutput('');
    }
  };

  // Handle mode change
  const handleModeChange = (newMode: 'encode' | 'decode') => {
    setMode(newMode);
    setOutput('');
    setError('');
  };

  // Handle process button click
  const handleProcess = () => {
    if (mode === 'encode') {
      handleEncode();
    } else {
      handleDecode();
    }
  };

  // Handle copy to clipboard
  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Handle swap input/output
  const handleSwap = () => {
    setInput(output);
    setOutput('');
    setError('');
  };

  // Sample inputs
  const sampleInputs = {
    encode: 'https://example.com/path?name=John Doe&age=25&tags=web,development',
    decode: 'https%3A%2F%2Fexample.com%2Fpath%3Fname%3DJohn%20Doe%26age%3D25%26tags%3Dweb%2Cdevelopment'
  };

  // Handle sample input
  const handleSample = () => {
    setInput(sampleInputs[mode]);
    setOutput('');
    setError('');
  };

  return (
    <ToolLayout
      title="URL Encoder/Decoder"
      metaContent="Encode or decode URL components to make them valid for web addresses."
      path="url-encoder"
    >
      <ResponsiveToolContainer
        title="URL Encoder/Decoder"
        description="Encode special characters for use in URLs or decode URL-encoded strings."
        usage="Enter a string to encode or decode. URL encoding converts special characters to a format that can be transmitted over the Internet."
      >
        {/* Mode Selection */}
        <div className="flex mb-4 border rounded-lg overflow-hidden">
          <button
            onClick={() => handleModeChange('encode')}
            className={`flex-1 py-2 px-4 text-center ${
              mode === 'encode'
                ? darkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => handleModeChange('decode')}
            className={`flex-1 py-2 px-4 text-center ${
              mode === 'decode'
                ? darkMode
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-500 text-white'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Decode
          </button>
        </div>

        {/* Input Area */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">
            {mode === 'encode' ? 'Text to Encode' : 'Text to Decode'}
          </label>
          <textarea
            rows={5}
            className={`w-full p-3 border rounded font-mono text-sm ${
              darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
            }`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter URL-encoded text to decode...'}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleProcess}
            className={`px-4 py-2 rounded text-sm font-medium ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {mode === 'encode' ? 'Encode URL' : 'Decode URL'}
          </button>
          <button
            onClick={handleSample}
            className={`px-4 py-2 rounded text-sm ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            Sample Input
          </button>
          {output && (
            <>
              <button
                onClick={handleCopy}
                className={`px-4 py-2 rounded text-sm ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                {copied ? 'Copied!' : 'Copy Result'}
              </button>
              <button
                onClick={handleSwap}
                className={`px-4 py-2 rounded text-sm ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Use as Input
              </button>
            </>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded text-sm">
            {error}
          </div>
        )}

        {/* Output Area */}
        {output && (
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Result</label>
            <div
              className={`w-full p-3 border rounded font-mono text-sm overflow-x-auto ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-gray-200' 
                  : 'bg-gray-50 border-gray-300 text-gray-800'
              }`}
            >
              {output}
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className={`mt-6 p-4 rounded-lg ${
          darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-700'
        }`}>
          <h3 className="text-lg font-medium mb-2">About URL Encoding</h3>
          <p className="text-sm mb-2">
            URL encoding converts characters that are not allowed in URLs into a format that can be transmitted over the Internet.
            It replaces unsafe ASCII characters with a "%" followed by two hexadecimal digits.
          </p>
          <p className="text-sm">
            Common examples:
          </p>
          <ul className="list-disc list-inside text-sm mt-1 space-y-1">
            <li>Space becomes "%20"</li>
            <li>? becomes "%3F"</li>
            <li>& becomes "%26"</li>
            <li>= becomes "%3D"</li>
            <li>/ becomes "%2F"</li>
          </ul>
        </div>
      </ResponsiveToolContainer>
    </ToolLayout>
  );
}
