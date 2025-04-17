import { useState } from 'react'

export default function CaseConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

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
    }
    setOutput(result)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Text Case Converter</h1>
      <textarea value={input} onChange={(e) => setInput(e.target.value)} className="w-full h-32 p-2 border rounded mb-2" placeholder="Enter text here" />
      <div className="flex flex-wrap gap-2 mb-2">
        <button onClick={() => convert('upper')} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-1 px-3 rounded">UPPER</button>
        <button onClick={() => convert('lower')} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-1 px-3 rounded">lower</button>
        <button onClick={() => convert('title')} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-1 px-3 rounded">Title Case</button>
        <button onClick={() => convert('camel')} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-1 px-3 rounded">camelCase</button>
        <button onClick={() => convert('snake')} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-1 px-3 rounded">snake_case</button>
      </div>
      {output && (
        <div className="mt-4">
          <textarea readOnly value={output} className="w-full h-32 p-2 border rounded" />
        </div>
      )}
    </div>
  )
}

