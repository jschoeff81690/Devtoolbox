import React, { useState, useEffect } from 'react';
import ToolLayout from '../components/ToolLayout';
import ResponsiveToolContainer from '../components/ResponsiveToolContainer';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import LineNumberedEditor from '../components/LineNumberedEditor';
import { useDarkMode } from '../context/DarkModeContext';
import { useTranslation } from 'react-i18next';

export default function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');
  const { darkMode } = useDarkMode();
  const { t } = useTranslation();
  const toolName = 'markdowntohtml';
  const livePreview = true

  // Live preview effect
  useEffect(() => {
    if (livePreview) {
      convertToHtml();
    }
  }, [markdown, livePreview]);

  const convertToHtml = () => {
    try {
      // Convert markdown to HTML using marked
      const rawHtml = marked(markdown);
      
      // Sanitize HTML to prevent XSS attacks
      const sanitizedHtml = DOMPurify.sanitize(rawHtml);
      
      setHtml(sanitizedHtml);
    } catch (error) {
      console.error('Error converting markdown to HTML:', error);
    }
  };

  const loadSampleMarkdown = () => {
    const sample = `# Markdown Example

## Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Text Formatting

*Italic text* or _also italic_

**Bold text** or __also bold__

***Bold and italic*** or ___also bold and italic___

~~Strikethrough~~

## Lists

### Unordered List
- Item 1
- Item 2
  - Nested item 1
  - Nested item 2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item

## Links and Images

[Visit GitHub](https://github.com)

![Alt text for image](https://via.placeholder.com/150)

## Code

Inline \`code\` example

\`\`\`javascript
// Code block
function greet() {
  console.log("Hello, world!");
}
\`\`\`

## Blockquotes

> This is a blockquote
> > Nested blockquote

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## Horizontal Rule

---

## Task Lists

- [x] Completed task
- [ ] Incomplete task
`;
    setMarkdown(sample);
  };

  return (
    <ToolLayout
      toolName={toolName}
      path="markdown-to-html"
    >
      <ResponsiveToolContainer
        toolName={toolName}
        usage={t(`tools.${toolName}.usage`)}
      >
        <div className="flex justify-between items-center mb-2">
          <button
            onClick={loadSampleMarkdown}
            className="text-sm px-2 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            {t('common.loadsample')}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-medium mb-2">{t('common.input')}</h3>
            <LineNumberedEditor
              value={markdown}
              onChange={setMarkdown}
              placeholder={t(`tools.${toolName}.inputplaceholder`)}
              language="markdown"
              height="500px"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">{t(`tools.${toolName}.preview`)}</h3>
            </div>
            
            <div 
              className={`border rounded h-[500px] overflow-auto ${
                darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'
              }`}
            >
              {html ? (
                <div className={`p-4 prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  {t(`tools.${toolName}.previewplaceholder`)}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {html && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">{t(`tools.${toolName}.htmloutput`)}</h3>
              <button
                onClick={() => navigator.clipboard.writeText(html)}
                className="text-sm px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                {t('common.copy')}
              </button>
            </div>
            <div className={`border rounded p-2 overflow-x-auto ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-300'
            }`}>
              <pre className="text-sm font-mono whitespace-pre-wrap">{html}</pre>
            </div>
          </div>
        )}
      </ResponsiveToolContainer>
    </ToolLayout>
  );
}
