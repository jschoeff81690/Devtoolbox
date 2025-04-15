import { Routes, Route, Link } from 'react-router-dom'
import JsonFormatter from './tools/JsonFormatter'

export default function App() {
  return (
    <div className="min-h-screen p-4 max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Devtoolbox</h1>
        <nav className="mt-2">
          <Link to="/json-formatter" className="text-blue-600 hover:underline">
            JSON Formatter
          </Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/json-formatter" element={<JsonFormatter />} />
        </Routes>
      </main>
    </div>
  )
}
