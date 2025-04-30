import React, { useState, useEffect } from 'react'
import ToolLayout from '../components/ToolLayout'
import ResponsiveToolContainer from '../components/ResponsiveToolContainer'
import LineNumberedEditor from '../components/LineNumberedEditor'
import LineNumberedOutput from '../components/LineNumberedOutput'
import { useDarkMode } from '../context/DarkModeContext'
import { useTranslation } from 'react-i18next'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const { darkMode } = useDarkMode()
  const { t } = useTranslation()
  const autoFormat = true
  const toolName = 'jsonformatter'

  // Auto-format when enabled
  useEffect(() => {
    if (autoFormat && input) {
      const timeout = setTimeout(() => {
        handleFormat();
      }, 500);
      
      return () => clearTimeout(timeout);
    }
  }, [input, autoFormat]);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, 2)
      setOutput(formatted)
      setError('')
    } catch (err: any) {
      setError(err.message)
      setOutput('')
    }
  }

  const loadSample = () => {
    const sample = `{"menu":{"id":"file","value":"File","popup":{"menuitem":[{"value":"New","onclick":"CreateNewDoc()"},{"value":"Open","onclick":"OpenDoc()"},{"value":"Close","onclick":"CloseDoc()"}]}},"glossary":{"title":"example glossary","GlossDiv":{"title":"S","GlossList":{"GlossEntry":{"ID":"SGML","SortAs":"SGML","GlossTerm":"Standard Generalized Markup Language","Acronym":"SGML","Abbrev":"ISO 8879:1986","GlossDef":{"para":"A meta-markup language, used to create markup languages such as DocBook.","GlossSeeAlso":["GML","XML"]},"GlossSee":"markup"}}}}}`;
    setInput(sample);
  };

  return (
    <ToolLayout
      toolName={toolName}
      path="json-formatter"
    >
      <ResponsiveToolContainer
        toolName={toolName}
        usage={t(`tools.${toolName}.usage`)}
      >
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={loadSample}
            className="text-sm px-2 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            {t('common.loadsample')}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2">{t('common.input')}</h3>
            <LineNumberedEditor
              value={input}
              onChange={setInput}
              placeholder={t(`tools.${toolName}.inputplaceholder`)}
              language="json"
              height="350px"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">{t(`tools.${toolName}.formattedjson`)}</h3>
            </div>
            
            {error ? (
              <div className={`p-4 rounded border ${darkMode ? 'bg-red-900/20 border-red-800' : 'bg-red-100 border-red-300'}`}>
                <p className="text-red-500 font-medium">{t('common.error')}</p>
                <p className="text-sm">{error}</p>
              </div>
            ) : (
              <LineNumberedOutput
                content={output}
                language="json"
                height="350px"
                showCopyButton={true}
              />
            )}
          </div>
        </div>
      </ResponsiveToolContainer>
    </ToolLayout>
  )
}
