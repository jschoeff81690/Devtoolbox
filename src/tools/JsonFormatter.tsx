import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async';

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
    <>
      <Helmet>
        <title>JSON Formatter – Devtoolbox</title>
        <meta name="description" content="Format, validate and beautify your JSON instantly." />
      </Helmet>
      <div>
        <h2 className="text-xl font-semibold mb-4">JSON Formatter & Validator</h2>
        <textarea
          rows={10}
          className="w-full p-2 border rounded font-mono text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your JSON here..."
        />
        <div className="flex items-center gap-4 mt-4">
          <button onClick={handleFormat} className="bg-custom-light-blue text-white px-4 py-2 rounded hover:bg-custom-dark-blue">
            Format JSON
          </button>
          {error && <span className="text-red-500">{error}</span>}
        </div>
        {output && (
          <pre className="bg-gray-100 border mt-4 p-4 rounded text-sm overflow-x-auto">{output}</pre>
        )}
      </div>
    </>
  )
}

