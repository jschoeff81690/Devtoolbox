import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import ResponsiveToolContainer from '../components/ResponsiveToolContainer'
import { useTranslation } from 'react-i18next';

export default function UuidGenerator() {
  const [uuid, setUuid] = useState('')
  const { t } = useTranslation();
  const toolName = 'uuidgenerator';

  const generateUuid = () => {
    const newUuid = crypto.randomUUID()
    setUuid(newUuid)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuid)
  }

  return (
      <ToolLayout
      toolName={toolName}
      path="uuid-generator"
    >
      <ResponsiveToolContainer
        toolName={toolName}
        usage={t(`tools.${toolName}.usage`)}
      >
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
        </ResponsiveToolContainer>
    </ToolLayout>
  )
}
