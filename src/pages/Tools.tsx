import { Link } from 'react-router-dom'
import AdBanner from '../components/AdBanner'

const tools = [
  {
    name: 'Markdown to HTML',
    path: '/markdown-to-html',
    description: 'Convert Markdown text to clean, readable HTML.'
  },
  {
      name: "HTML/CSS Minifier",
      path: "/html-css-minifier",
      description: "Minify your HTML and CSS code quickly and efficiently.",
  },
  {
    name: 'JSON Formatter',
    path: '/json-formatter',
    description: 'Format, validate, and visualize your JSON data in a readable format.',
  },
  {
    name: 'UUID Generator',
    path: '/uuid-generator',
    description: 'Generate random UUIDs quickly and copy them to clipboard.'
  },
  {
    name: 'Base64 Encoder / Decoder',
    path: '/base64',
    description: 'Encode or decode Base64 strings on the fly.'
  },
  {
    name: 'JWT Decoder',
    path: '/jwt-decoder',
    description: 'Decode and inspect the contents of a JWT token.',
  },
  {
    name: 'Timestamp Converter',
    path: '/timestamp-converter',
    description: 'Convert between Unix timestamps and readable date formats.',
  },
  {
    name: 'Case Converter',
    path: '/case-converter',
    description: 'Convert text to UPPER, lower, Title, camelCase, or snake_case.',
  },
  {
    name: 'Lorem Ipsum Generator',
    path: '/lorem-ipsum',
    description: 'Generate placeholder paragraphs of lorem ipsum text.',
  },
  {
    name: 'Regex Tester',
    path: '/regex-tester',
    description: 'Test regular expressions against any input string.',
  },
]

export default function Tools() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Tools</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => (
          <li key={tool.name} className="p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition">
            {tool.name.startsWith('ad') ? (
              <AdBanner />
            ) : (
              <>
                <Link to={tool.path} className="text-xl text-custom-dark-blue font-semibold hover:underline">
                  {tool.name}
                </Link>
                <p className="text-gray-600 text-sm mt-1">{tool.description}</p>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}


