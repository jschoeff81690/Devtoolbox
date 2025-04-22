import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [decoded, setDecoded] = useState<{ header: any, payload: any } | null>(null)

  const decodeJwt = () => {
    try {
      const parts = token.split('.')
      if (parts.length !== 3) throw new Error('Invalid JWT')
      const header = JSON.parse(atob(parts[0]))
      const payload = JSON.parse(atob(parts[1]))
      setDecoded({ header, payload })
    } catch {
      setDecoded(null)
    }
  }

  return (
      <ToolLayout
          title="JWT Decoder"
          metaContent="Decode and inspect the contents of a JWT token."
          path="jwt-decoder"
        >
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">JWT Decoder</h1>
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
        <p className="mb-2"><strong>What it does:</strong> Decodes JSON Web Tokens (JWT) to reveal their header and payload contents.</p>
        <p><strong>How to use:</strong> Paste your JWT token in the text area below and click "Decode" to view the decoded information.</p>
      </div>
      <textarea value={token} onChange={(e) => setToken(e.target.value)} placeholder="Paste JWT here" className="w-full h-32 p-2 border rounded mb-4" />
      <button onClick={decodeJwt} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-2 px-4 rounded">
        Decode
      </button>
      {decoded && (
        <div className="mt-4">
          <h2 className="font-semibold">Header</h2>
          <pre>{JSON.stringify(decoded.header, null, 2)}</pre>
          <h2 className="font-semibold mt-4">Payload</h2>
          <pre>{JSON.stringify(decoded.payload, null, 2)}</pre>
        </div>
      )}
    </div>
        </ToolLayout>
  )
}

