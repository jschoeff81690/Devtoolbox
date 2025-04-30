import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import ResponsiveToolContainer from '../components/ResponsiveToolContainer'
import { useTranslation } from 'react-i18next'

export default function CaseConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const { t } = useTranslation()
  const toolName = 'caseconverter'

  const toTitleCase = (str: string) =>
    str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase())

  const convert = (type: string) => {
    let result = ''
    switch (type) {
      case 'upper': result = input.toUpperCase(); break
      case 'lower': result = input.toLowerCase(); break
      case 'title': result = toTitleCase(input); break
      case 'camel': result = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, ''); break
      case 'snake': result = input.toLowerCase().replace(/\s+/g, '_'); break
      case 'constant': result = input.toUpperCase().replace(/\s+/g, '_'); break
    }
    setOutput(result)
  }

  return (
    <ToolLayout
      toolName={toolName}
      path="case-converter"
    >
      <ResponsiveToolContainer
        toolName={toolName}
        usage={t(`tools.${toolName}.usage`)}
      >
            <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-32 p-2 border rounded mb-2" placeholder="Enter text here" />
            <div className="flex flex-wrap gap-2 mb-2">
              <button onClick={() => convert('upper')} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-1 px-3 rounded">{t(`tools.${toolName}.uppercase`)}</button>
              <button onClick={() => convert('lower')} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-1 px-3 rounded">{t(`tools.${toolName}.lowercase`)}</button>
              <button onClick={() => convert('title')} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-1 px-3 rounded">{t(`tools.${toolName}.titlecase`)} Case</button>
              <button onClick={() => convert('camel')} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-1 px-3 rounded">{t(`tools.${toolName}.camelcase`)}</button>
              <button onClick={() => convert('snake')} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-1 px-3 rounded">{t(`tools.${toolName}.snakecase`)}</button>
              <button onClick={() => convert('constant')} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-1 px-3 rounded">{t(`tools.${toolName}.constantcase`)}</button>
            </div>
            {output && (
              <div className="mt-4">
                <textarea readOnly value={output} className="w-full h-32 p-2 border rounded" />
              </div>
            )}
      </ResponsiveToolContainer>
    </ToolLayout>
  )
}
