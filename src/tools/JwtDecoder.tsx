import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import ResponsiveToolContainer from '../components/ResponsiveToolContainer'
import { useTranslation } from 'react-i18next'

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [decoded, setDecoded] = useState<{ header: any, payload: any } | null>(null)
  const { t } = useTranslation()
  const toolName = 'jwtdecoder'

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
      toolName={toolName}
      path="jwt-decoder"
    >
      <ResponsiveToolContainer
        toolName={toolName}
        usage={t(`tools.${toolName}.usage`)}
      >
        <textarea 
          value={token} 
          onChange={(e) => setToken(e.target.value)} 
          placeholder={t(`tools.${toolName}.placeholder`)} 
          className="w-full h-32 p-2 border rounded mb-4" 
        />
        <button 
          onClick={decodeJwt} 
          className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-2 px-4 rounded"
        >
          {t('common.decode')}
        </button>
        {decoded && (
          <div className="mt-4">
            <h2 className="font-semibold">{t(`tools.${toolName}.header`)}</h2>
            <pre>{JSON.stringify(decoded.header, null, 2)}</pre>
            <h2 className="font-semibold mt-4">{t(`tools.${toolName}.payload`)}</h2>
            <pre>{JSON.stringify(decoded.payload, null, 2)}</pre>
          </div>
        )}
      </ResponsiveToolContainer>
    </ToolLayout>
  )
}

