import React, { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import ResponsiveToolContainer from '../components/ResponsiveToolContainer'
import LineNumberedEditor from '../components/LineNumberedEditor'
import LineNumberedOutput from '../components/LineNumberedOutput'

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
        <LineNumberedEditor
          value={input}
          onChange={setInput}
          placeholder="Paste your JSON here..."
          language="json"
          height="200px"
        />
        <div className="flex flex-wrap items-center gap-4 my-4">
          <button 
            onClick={handleFormat} 
            className="bg-custom-light-blue text-white px-4 py-2 rounded hover:bg-custom-dark-blue"
          >
            Format JSON
          </button>
          {error && <span className="text-red-500 text-sm">{error}</span>}
        </div>
        {output && (
          <LineNumberedOutput
            content={output}
            language="json"
            height="300px"
          />
        )}
      </ResponsiveToolContainer>
    </ToolLayout>
  )
}

