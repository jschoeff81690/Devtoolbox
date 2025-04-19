import React, { useState, useEffect } from 'react'
import ToolLayout from '../components/ToolLayout'

export default function HtmlCssMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      let result = input

      // Remove comments
      result = result.replace(/<!--[\s\S]*?-->/g, '') // HTML comments
      result = result.replace(/\/\*[\s\S]*?\*\//g, '') // CSS comments

      // Remove whitespace and line breaks
      result = result.replace(/\s{2,}/g, ' ')
      result = result.replace(/\n/g, '')

      setOutput(result.trim())
    }, 1000)

    return () => clearTimeout(timeout)
  }, [input])

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  return (
    <ToolLayout
      title="HTML/CSS Minifier"
      metaContent="Minify your HTML and CSS code quickly and efficiently."
      path="html-css-minifier"
    >
      <div>
        <h2 className="text-xl font-semibold mb-4">HTML/CSS Minifier</h2>
        <textarea
          className="w-full p-2 border rounded font-mono text-sm"
          rows={10}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your HTML or CSS code here..."
        />
        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={handleCopy}
            className="bg-custom-light-blue text-white px-4 py-2 rounded hover:bg-custom-dark-blue"
          >
            Copy Minified
          </button>
        </div>
        {output && (
          <pre className="bg-gray-100 border mt-4 p-4 rounded text-sm overflow-x-auto">{output}</pre>
        )}
      </div>
    </ToolLayout>
  )
}

