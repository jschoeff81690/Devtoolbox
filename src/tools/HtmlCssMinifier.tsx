import React, { useState, useEffect } from 'react'
import ToolLayout from '../components/ToolLayout'
import ResponsiveToolContainer from '../components/ResponsiveToolContainer'
import LineNumberedEditor from '../components/LineNumberedEditor'
import LineNumberedOutput from '../components/LineNumberedOutput'
import { useTranslation } from 'react-i18next'

export default function HtmlCssMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [language, setLanguage] = useState<'html' | 'css'>('html')
  const { t } = useTranslation()
  const toolName = 'htmlcssminifier'

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!input) {
        setOutput('');
        return;
      }

      let result = input

      // Remove comments based on language
      if (language === 'html') {
        result = result.replace(/<!--[\s\S]*?-->/g, '') // HTML comments
      }
      
      // CSS comments (apply to both HTML and CSS since CSS can be in HTML)
      result = result.replace(/\/\*[\s\S]*?\*\//g, '') 

      // Remove whitespace and line breaks
      result = result.replace(/\s{2,}/g, ' ')
      result = result.replace(/\n/g, '')

      setOutput(result.trim())
    }, 500)

    return () => clearTimeout(timeout)
  }, [input, language])

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
  }

  const loadSample = () => {
    if (language === 'html') {
      setInput(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample HTML</title>
    <!-- This is a comment that will be removed -->
    <style>
        /* This CSS comment will also be removed */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello, World!</h1>
        <p>This is a sample HTML document with some CSS styling.</p>
        <!-- Another comment that will be removed during minification -->
        <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
        </ul>
    </div>
</body>
</html>`);
    } else {
      setInput(`/* Main Styles */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

/* Container styles */
.container {
    width: 80%;
    margin: auto;
    overflow: hidden;
}

/* Header Styles */
header {
    background: #50b3a2;
    color: white;
    padding-top: 30px;
    min-height: 70px;
    border-bottom: #e8491d 3px solid;
}

/* This is a comment that will be removed */
header a {
    color: #ffffff;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 16px;
}

/* Navigation */
header ul {
    padding: 0;
    margin: 0;
    list-style: none;
    overflow: hidden;
}

header li {
    float: left;
    display: inline;
    padding: 0 20px 0 20px;
}

@media(max-width: 768px) {
    header #branding,
    header nav,
    header nav li {
        float: none;
        text-align: center;
        width: 100%;
    }
}`);
    }
  }

  return (
    <ToolLayout
      toolName={toolName}
      path="html-css-minifier"
    >
      <ResponsiveToolContainer
        toolName={toolName}
        usage={t(`tools.${toolName}.usage`)}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium">{t('common.input')}</h3>
            <div className="flex border rounded overflow-hidden">
              <button 
                className={`px-3 py-1 ${language === 'html' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
                onClick={() => setLanguage('html')}
              >
                {t(`tools.${toolName}.htmlmode`)}
              </button>
              <button 
                className={`px-3 py-1 ${language === 'css' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
                onClick={() => setLanguage('css')}
              >
                {t(`tools.${toolName}.cssmode`)}
              </button>
            </div>
          </div>
          <button
            onClick={loadSample}
            className="text-sm px-2 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            {t('common.loadsample')}
          </button>
        </div>
        
        <LineNumberedEditor
          value={input}
          onChange={setInput}
          placeholder={`${t('common.paste')} ${language.toUpperCase()} ${t('common.codehere')}...`}
          language={language}
          height="250px"
        />
        
        <h3 className="text-lg font-medium mt-6 mb-2">{t(`tools.${toolName}.minifiedoutput`)}</h3>
        <LineNumberedOutput
          content={output}
          language={language}
          height="150px"
          showLineNumbers={false}
        />
        
        <div className="mt-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>{t(`tools.${toolName}.originalsize`)}: {input.length} {t(`tools.${toolName}.characters`)}</span>
            <span>•</span>
            <span>{t(`tools.${toolName}.minifiedsize`)}: {output.length} {t(`tools.${toolName}.characters`)}</span>
            <span>•</span>
            <span>{t(`tools.${toolName}.saved`)}: {input.length > 0 ? Math.round((1 - output.length / input.length) * 100) : 0}%</span>
          </div>
        </div>
      </ResponsiveToolContainer>
    </ToolLayout>
  )
}
