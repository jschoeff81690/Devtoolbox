import { useState } from 'react'

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [testText, setTestText] = useState('')
  const [matches, setMatches] = useState<string[]>([])

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, 'g')
      const result = [...testText.matchAll(regex)].map(match => match[0])
      setMatches(result)
    } catch {
      setMatches(['Invalid regex'])
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Regex Tester</h1>
      <input
        value={pattern}
        onChange={(e) => setPattern(e.target.value)}
        placeholder="Enter regex pattern"
        className="w-full p-2 border rounded mb-4"
      />
      <textarea
        value={testText}
        onChange={(e) => setTestText(e.target.value)}
        placeholder="Enter text to test"
        className="w-full h-32 p-2 border rounded mb-4"
      />
      <button onClick={testRegex} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-2 px-4 rounded">
        Test
      </button>
      <div className="mt-4">
        <h2 className="font-semibold mb-2">Matches:</h2>
        <pre className="bg-gray-100 p-2 rounded">{matches.join('\n')}</pre>
      </div>
    </div>
  )
}

