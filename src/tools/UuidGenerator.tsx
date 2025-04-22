import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'

export default function UuidGenerator() {
  const [uuid, setUuid] = useState('')

  const generateUuid = () => {
    const newUuid = crypto.randomUUID()
    setUuid(newUuid)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuid)
  }

  return (
      <ToolLayout
          title="UUID Generator"
          metaContent="Generate random UUIDs quickly and copy them to clipboard."
          path="uuid-generator"
        >
            <div className="p-4">
              <h1 className="text-2xl font-bold mb-4">UUID Generator</h1>
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
                <p className="mb-2"><strong>What it does:</strong> Generates random, cryptographically secure UUIDs (Universally Unique Identifiers).</p>
                <p><strong>How to use:</strong> Click the "Generate UUID" button to create a new UUID. Use the "Copy" button to copy it to your clipboard.</p>
              </div>
              <button onClick={generateUuid} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-2 px-4 rounded">
                Generate UUID
              </button>
              {uuid && (
                <div className="mt-4">
                  <p className="break-all">{uuid}</p>
                  <button onClick={copyToClipboard} className="mt-2 bg-custom-dark-blue hover:bg-custom-light-blue text-white font-semibold py-1 px-3 rounded">
                    Copy
                  </button>
                </div>
              )}
            </div>
        </ToolLayout>
  )
}
