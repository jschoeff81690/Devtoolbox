import React, { useEffect, useState } from 'react'
import { marked } from 'marked'
import ToolLayout from '../components/ToolLayout'

export default function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState('')
  const [html, setHtml] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      const result = marked.parse(markdown)
      setHtml(result)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [markdown])

  const handleCopy = () => {
    navigator.clipboard.writeText(html)
  }

  const handleExport = () => {
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'converted.html'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <ToolLayout
      title="Markdown to HTML Converter"
      metaContent="Convert your Markdown text to clean, readable HTML with this easy-to-use tool."
      path="markdown-to-html"
    >
      <div>
        <h2 className="text-xl font-semibold mb-4">Markdown to HTML Converter</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <textarea
            className="w-full p-2 border rounded font-mono text-sm"
            rows={16}
            placeholder="Write or paste your Markdown here..."
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
          <div className="p-4 border rounded bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Live Preview</h3>
              <div className="space-x-2">
                <button
                  onClick={handleCopy}
                  className="bg-custom-light-blue text-white px-3 py-1 rounded hover:bg-custom-dark-blue text-sm"
                >
                  Copy HTML
                </button>
                <button
                  onClick={handleExport}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 text-sm"
                >
                  Export
                </button>
              </div>
            </div>
            <div
              className="prose max-w-none text-sm"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}

