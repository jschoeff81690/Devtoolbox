import { ToolCategory } from '../components/CategoryFilter';

export interface Tool {
  path: string;
  categories: ToolCategory[];
}

export const tools: Tool[] = [
  {
    path: '/markdown-to-html',
    categories: ['Conversion', 'Text', 'Formatter']
  },
  {
    path: '/html-css-minifier',
    categories: ['Code', 'Formatter', 'Utility']
  },
  {
    path: '/json-formatter',
    categories: ['Code', 'Formatter']
  },
  {
    path: '/json-schema-generator',
    categories: ['Code', 'Generator', 'Utility']
  },
  {
    path: '/uuid-generator',
    categories: ['Generator', 'Utility']
  },
  {
    path: '/base64',
    categories: ['Conversion', 'Utility']
  },
  {
    path: '/jwt-decoder',
    categories: ['Code', 'Utility']
  },
  {
    path: '/timestamp-converter',
    categories: ['Conversion', 'Utility']
  },
  {
    path: '/case-converter',
    categories: ['Text', 'Formatter']
  },
  {
    path: '/lorem-ipsum',
    categories: ['Generator', 'Text']
  },
  {
    path: '/regex-tester',
    categories: ['Code', 'Utility']
  },
  {
    path: '/color-converter',
    categories: ['Conversion', 'Utility', 'Design']
  },
  {
    path: '/word-counter',
    categories: ['Text', 'Utility', 'Analyzer']
  },
  {
    path: '/url-encoder',
    categories: ['Conversion', 'Web', 'Utility']
  },
  {
    path: '/hash-generator',
    categories: ['Security', 'Utility', 'Conversion']
  },
  {
    path: '/qr-code-generator',
    categories: ['Generator', 'Web', 'Utility']
  },
  {
    path: '/diff-checker',
    categories: ['Code', 'Text', 'Analyzer']
  },
  {
    path: '/api-tester',
    categories: ['Web', 'Developer', 'Utility']
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
