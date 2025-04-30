import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import ResponsiveToolContainer from '../components/ResponsiveToolContainer'
import { useTranslation } from 'react-i18next'
import { useDarkMode } from '../context/DarkModeContext'

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [testText, setTestText] = useState('')
  const [matches, setMatches] = useState<string[]>([])
  const { t } = useTranslation()
  const { darkMode } = useDarkMode()
  const toolName = 'regextester'

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, 'g')
      const result = [...testText.matchAll(regex)].map(match => match[0])
      setMatches(result)
    } catch {
      setMatches([t('common.error')])
    }
  }

  return (
    <ToolLayout
      toolName={toolName}
      path="regex-tester"
    >
      <ResponsiveToolContainer
        toolName={toolName}
        usage={t(`tools.${toolName}.usage`)}
      >
        <input
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
          placeholder={t(`tools.${toolName}.pattern`)}
          className={`w-full p-2 border rounded mb-4 ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
          }`}
        />
        <textarea
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder={t(`tools.${toolName}.teststring`)}
          className={`w-full h-32 p-2 border rounded mb-4 ${
            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
          }`}
        />
        <button 
          onClick={testRegex} 
          className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-2 px-4 rounded"
        >
          {t('common.test')}
        </button>
        <div className="mt-4">
          <h2 className="font-semibold mb-2">{t(`tools.${toolName}.matches`)}:</h2>
          <pre className={`p-2 rounded ${
            darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100'
          }`}>
            {matches.length > 0 ? matches.join('\n') : t(`tools.${toolName}.nomatches`)}
          </pre>
        </div>
      </ResponsiveToolContainer>
    </ToolLayout>
  )
}

