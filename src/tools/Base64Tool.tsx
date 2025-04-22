import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')

  const handleConvert = () => {
    try {
      const result = mode === 'encode'
        ? btoa(input)
        : atob(input)
      setOutput(result)
    } catch (err) {
      setOutput('Invalid input')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  return (
      <ToolLayout
          title="Base64 encoder and decoder"
          metaContent="Encode or decode Base64 strings on the fly."
          path="base64"
        >
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Base64 Encoder / Decoder</h1>
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
            <p className="mb-2"><strong>What it does:</strong> Converts text between regular format and Base64 encoding.</p>
            <p><strong>How to use:</strong> Select "Encode" to convert normal text to Base64, or "Decode" to convert Base64 back to normal text. Enter your input text and click "Convert". Use the "Copy" button to copy the result.</p>
          </div>
          <div className="mb-2">
            <label className="mr-2">
              <input type="radio" checked={mode === 'encode'} onChange={() => setMode('encode')} />
              Encode
            </label>
            <label className="ml-4">
              <input type="radio" checked={mode === 'decode'} onChange={() => setMode('decode')} />
              Decode
            </label>
          </div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-32 p-2 border rounded mb-2" placeholder="Enter text here" />
          <button onClick={handleConvert} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-2 px-4 rounded">
            Convert
          </button>
          {output && (
            <div className="mt-4">
              <p className="break-all">{output}</p>
              <button onClick={copyToClipboard} className="mt-2 bg-custom-dark-blue hover:bg-custom-light-blue text-white font-semibold py-1 px-3 rounded">
                Copy
              </button>
            </div>
          )}
        </div>
    </ToolLayout>
  )
}
