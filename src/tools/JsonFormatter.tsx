import React, { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import ResponsiveToolContainer from '../components/ResponsiveToolContainer'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError('')
    } catch (err: any) {
      setError(err.message)
      setOutput('')
    }
  }

  return (
    <ToolLayout
      title="JSON Formatter"
      metaContent="Format, validate, and visualize your JSON data in a readable format."
      path="json-formatter"
    >
      <ResponsiveToolContainer
        title="JSON Formatter & Validator"
        description="Formats and validates your JSON data to make it readable and properly structured."
        usage="Paste your minified or unformatted JSON in the text area below, then click 'Format JSON' to convert it into a properly indented, readable format."
      >
        <textarea
          rows={10}
          className="w-full p-2 border rounded font-mono text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
        />
        <div className="flex flex-wrap items-center gap-4">
          <button 
            onClick={handleFormat} 
            className="bg-custom-light-blue text-white px-4 py-2 rounded hover:bg-custom-dark-blue"
          >
            Format JSON
          </button>
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
        {output && (
          <pre className="bg-gray-100 border p-4 rounded text-sm overflow-x-auto">{output}</pre>
        )}
      </ResponsiveToolContainer>
    </ToolLayout>
  )
}

