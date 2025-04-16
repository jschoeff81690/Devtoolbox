import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import JsonFormatter from './tools/JsonFormatter'
import Tools from './pages/Tools'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Tools />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/json-formatter" element={<JsonFormatter />} />
      </Routes>
    </Layout>
  )
}

