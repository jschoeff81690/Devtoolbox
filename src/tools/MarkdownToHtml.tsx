import React, { useState } from 'react';
import ToolLayout from '../components/ToolLayout';
import ResponsiveToolContainer from '../components/ResponsiveToolContainer';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import LineNumberedEditor from '../components/LineNumberedEditor';

export default function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState('');
  const [html, setHtml] = useState('');

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
      title="Markdown to HTML"
      metaContent="Convert Markdown text to clean, readable HTML."
      path="markdown-to-html"
    >
      <ResponsiveToolContainer
        title="Markdown to HTML Converter"
        description="Convert Markdown text to clean, readable HTML."
        usage="Enter or paste your Markdown text in the input area, then click 'Convert to HTML' to see the HTML output and preview."
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">Markdown Input</h3>
          <button
            onClick={loadSampleMarkdown}
            className="text-sm px-2 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Load Sample
          </button>
        </div>
        
        <LineNumberedEditor
          value={markdown}
          onChange={setMarkdown}
          placeholder="Enter your Markdown here..."
          language="markdown"
          height="250px"
        />
        
        <div className="my-4">
          <button
            onClick={convertToHtml}
            className="bg-custom-light-blue text-white px-4 py-2 rounded hover:bg-custom-dark-blue"
          >
            Convert to HTML
          </button>
        </div>
        
        {html && (
          <>
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">HTML Output</h3>
              <div className="border rounded p-2 bg-gray-50 overflow-x-auto">
                <pre className="text-sm font-mono whitespace-pre-wrap">{html}</pre>
              </div>
              
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => navigator.clipboard.writeText(html)}
                  className="text-sm px-3 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Copy HTML
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Preview</h3>
              <div className="border rounded p-4 prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </div>
          </>
        )}
      </ResponsiveToolContainer>
    </ToolLayout>
  );
}
