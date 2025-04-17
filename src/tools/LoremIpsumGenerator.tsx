import { useState } from 'react'

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState(3)
  const [output, setOutput] = useState('')

  const generate = () => {
    setOutput(Array(count).fill(lorem).join('\n\n'))
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lorem Ipsum Generator</h1>
      <div className="mb-2 flex items-center gap-2">
        <label htmlFor="count">Paragraphs:</label>
        <input
          id="count"
          type="number"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          className="w-20 p-2 border rounded"
          min={1}
          max={20}
        />
        <button onClick={generate} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-2 px-4 rounded">
          Generate
        </button>
      </div>
      <textarea readOnly className="w-full h-64 p-2 border rounded" value={output} />
    </div>
  )
}

