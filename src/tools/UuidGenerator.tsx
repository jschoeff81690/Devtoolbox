import { useState } from 'react'

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">UUID Generator</h1>
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
  )
}
