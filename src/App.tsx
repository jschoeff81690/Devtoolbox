import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import JsonFormatter from './tools/JsonFormatter'
import Tools from './pages/Tools'
import UuidGenerator from './tools/UuidGenerator'
import Base64Tool from './tools/Base64Tool'
import JwtDecoder from './tools/JwtDecoder'
import TimestampConverter from './tools/TimestampConverter'
import CaseConverter from './tools/CaseConverter'
import LoremIpsumGenerator from './tools/LoremIpsumGenerator'
import RegexTester from './tools/RegexTester'
import MarkdownToHtml from './tools/MarkdownToHtml'
import HtmlCssMinifier from './tools/HtmlCssMinifier'
import ColorConverter from './tools/ColorConverter'
import WordCounter from './tools/WordCounter'
import UrlEncoder from './tools/UrlEncoder'
import HashGenerator from './tools/HashGenerator'
import QrCodeGenerator from './tools/QrCodeGenerator'
import JsonSchemaGenerator from './tools/JsonSchemaGenerator'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Tools />} />
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
      </Routes>
    </Layout>
  )
}
