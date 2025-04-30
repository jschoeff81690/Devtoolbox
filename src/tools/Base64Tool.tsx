import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import ResponsiveToolContainer from '../components/ResponsiveToolContainer';
import { useTranslation } from 'react-i18next';

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const { t } = useTranslation();
  const toolName = 'base64';

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
      toolName={toolName}
      path="base64"
    >
      <ResponsiveToolContainer
        toolName={toolName}
        usage={t(`tools.${toolName}.usage`)}
      >
          <div className="mb-2">
            <label className="mr-2">
              <input type="radio" checked={mode === 'encode'} onChange={() => setMode('encode')} />
              {t(`tools.${toolName}.encode`)}
            </label>
            <label className="ml-4">
              <input type="radio" checked={mode === 'decode'} onChange={() => setMode('decode')} />
              {t(`tools.${toolName}.decode`)}
            </label>
          </div>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-32 p-2 border rounded mb-2" placeholder="Enter text here" />
          <button onClick={handleConvert} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-2 px-4 rounded">
              {t(`tools.${toolName}.convert`)}
          </button>
          {output && (
            <div className="mt-4">
              <p className="break-all">{output}</p>
              <button onClick={copyToClipboard} className="mt-2 bg-custom-dark-blue hover:bg-custom-light-blue text-white font-semibold py-1 px-3 rounded">
              {t(`tools.${toolName}.copy`)}
              </button>
            </div>
          )}
      </ResponsiveToolContainer>
    </ToolLayout>
  )
}
