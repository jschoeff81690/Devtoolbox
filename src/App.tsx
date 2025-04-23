import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Base64Tool from './tools/Base64Tool'
import CaseConverter from './tools/CaseConverter'
import ColorConverter from './tools/ColorConverter'
import Contact from './pages/Contact'
import DiffChecker from './tools/DiffChecker'
import HashGenerator from './tools/HashGenerator'
import HtmlCssMinifier from './tools/HtmlCssMinifier'
import JsonFormatter from './tools/JsonFormatter'
import JsonSchemaGenerator from './tools/JsonSchemaGenerator'
import JwtDecoder from './tools/JwtDecoder'
import Layout from './components/Layout'
import LoremIpsumGenerator from './tools/LoremIpsumGenerator'
import MarkdownToHtml from './tools/MarkdownToHtml'
import Privacy from './pages/Privacy'
import QrCodeGenerator from './tools/QrCodeGenerator'
import RegexTester from './tools/RegexTester'
import TimestampConverter from './tools/TimestampConverter'
import Tools from './pages/Tools'
import UrlEncoder from './tools/UrlEncoder'
import UuidGenerator from './tools/UuidGenerator'
import WordCounter from './tools/WordCounter'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Tools />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/json-formatter" element={<JsonFormatter />} />
        <Route path="/json-schema-generator" element={<JsonSchemaGenerator />} />
        <Route path="/uuid-generator" element={<UuidGenerator />} />
        <Route path="/base64" element={<Base64Tool />} />
        <Route path="/jwt-decoder" element={<JwtDecoder />} />
        <Route path="/timestamp-converter" element={<TimestampConverter />} />
        <Route path="/case-converter" element={<CaseConverter />} />
        <Route path="/lorem-ipsum" element={<LoremIpsumGenerator />} />
        <Route path="/regex-tester" element={<RegexTester />} />
        <Route path="/markdown-to-html" element={<MarkdownToHtml />} />
        <Route path="/html-css-minifier" element={<HtmlCssMinifier />} />
        <Route path="/color-converter" element={<ColorConverter />} />
        <Route path="/word-counter" element={<WordCounter />} />
        <Route path="/url-encoder" element={<UrlEncoder />} />
        <Route path="/hash-generator" element={<HashGenerator />} />
        <Route path="/qr-code-generator" element={<QrCodeGenerator />} />
        <Route path="/diff-checker" element={<DiffChecker />} />
      </Routes>
    </Layout>
  )
}
