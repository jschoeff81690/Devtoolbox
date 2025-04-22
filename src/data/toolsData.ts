import { ToolCategory } from '../components/CategoryFilter';

export interface Tool {
  name: string;
  path: string;
  description: string;
  categories: ToolCategory[];
}

export const tools: Tool[] = [
  {
    name: 'Markdown to HTML',
    path: '/markdown-to-html',
    description: 'Convert Markdown text to clean, readable HTML.',
    categories: ['Conversion', 'Text', 'Formatter']
  },
  {
    name: 'HTML/CSS Minifier',
    path: '/html-css-minifier',
    description: 'Minify your HTML and CSS code quickly and efficiently.',
    categories: ['Code', 'Formatter', 'Utility']
  },
  {
    name: 'JSON Formatter',
    path: '/json-formatter',
    description: 'Format, validate, and visualize your JSON data in a readable format.',
    categories: ['Code', 'Formatter']
  },
  {
    name: 'UUID Generator',
    path: '/uuid-generator',
    description: 'Generate random UUIDs quickly and copy them to clipboard.',
    categories: ['Generator', 'Utility']
  },
  {
    name: 'Base64 Encoder / Decoder',
    path: '/base64',
    description: 'Encode or decode Base64 strings on the fly.',
    categories: ['Conversion', 'Utility']
  },
  {
    name: 'JWT Decoder',
    path: '/jwt-decoder',
    description: 'Decode and inspect the contents of a JWT token.',
    categories: ['Code', 'Utility']
  },
  {
    name: 'Timestamp Converter',
    path: '/timestamp-converter',
    description: 'Convert between Unix timestamps and readable date formats.',
    categories: ['Conversion', 'Utility']
  },
  {
    name: 'Case Converter',
    path: '/case-converter',
    description: 'Convert text to UPPER, lower, Title, camelCase, or snake_case.',
    categories: ['Text', 'Formatter']
  },
  {
    name: 'Lorem Ipsum Generator',
    path: '/lorem-ipsum',
    description: 'Generate placeholder paragraphs of lorem ipsum text.',
    categories: ['Generator', 'Text']
  },
  {
    name: 'Regex Tester',
    path: '/regex-tester',
    description: 'Test regular expressions against any input string.',
    categories: ['Code', 'Utility']
  },
];

export const getAllCategories = (): ToolCategory[] => {
  const categoriesSet = new Set<ToolCategory>(['All']);
  
  tools.forEach(tool => {
    tool.categories.forEach(category => {
      categoriesSet.add(category);
    });
  });
  
  return Array.from(categoriesSet);
};
