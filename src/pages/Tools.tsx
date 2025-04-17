import { Link } from 'react-router-dom'
import AdBanner from '../components/AdBanner'

const tools = [
  {
    name: 'JSON Formatter',
    path: '/json-formatter',
    description: 'Format, validate, and visualize your JSON data in a readable format.',
  },
  {
    name: 'ad-1',
    path: '',
    description: '',
  },
  // You can add more tools here as you expand
]

export default function Tools() {
  const options = []
  for (var tool of tools) {
      if (tool.name.startsWith("ad")) {
          options.push(
              <li key={tool.name} className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition">
                  <AdBanner />
              </li>
          )
      } else {
          options.push(
              <li key={tool.name} className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition">
                <Link to={tool.path} className="text-xl text-custom-dark-blue font-semibold hover:underline">
                  {tool.name}
                </Link>
                <p className="text-gray-600 text-sm mt-1">{tool.description}</p>
              </li>
          )
      }
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Tools</h1>
      <ul className="space-y-4">
        {options}
        </ul>
    </div>
  )
}

