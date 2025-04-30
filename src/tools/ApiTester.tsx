import { useState, useEffect } from 'react'
import ToolLayout from '../components/ToolLayout';
import ResponsiveToolContainer from '../components/ResponsiveToolContainer';
import { useTranslation } from 'react-i18next';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

interface Header {
  key: string
  value: string
}

interface ApiResponse {
  status: number
  statusText: string
  headers: Record<string, string>
  data: any
  time: number
}

export default function ApiTester() {
  const [url, setUrl] = useState<string>('')
  const [method, setMethod] = useState<HttpMethod>('GET')
  const [headers, setHeaders] = useState<Header[]>([{ key: '', value: '' }])
  const [body, setBody] = useState<string>('')
  const [response, setResponse] = useState<ApiResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [bodyFormat, setBodyFormat] = useState<'json' | 'text'>('json')
  const [showHeaders, setShowHeaders] = useState<boolean>(false)
  const [showRequestBody, setShowRequestBody] = useState<boolean>(false)
  const [corsMode, setCorsMode] = useState<RequestMode>('cors')
  const { t } = useTranslation();
  const toolName = 'apitester';

  // Add a new header field
  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }])
  }

  // Remove a header field
  const removeHeader = (index: number) => {
    const newHeaders = [...headers]
    newHeaders.splice(index, 1)
    setHeaders(newHeaders)
  }

  // Update a header field
  const updateHeader = (index: number, field: 'key' | 'value', value: string) => {
    const newHeaders = [...headers]
    newHeaders[index][field] = value
    setHeaders(newHeaders)
  }

  // Format JSON for display
  const formatJson = (json: any): string => {
    try {
      return JSON.stringify(json, null, 2)
    } catch (e) {
      return String(json)
    }
  }

  // Send the API request
  const sendRequest = async () => {
    if (!url) {
      setError(t(`tools.${toolName}.url`) + ' ' + t('common.error'))
      return
    }

    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      // Prepare headers
      const headerObj: Record<string, string> = {}
      headers.forEach(h => {
        if (h.key.trim()) {
          headerObj[h.key.trim()] = h.value
        }
      })

      // Prepare request options
      const options: RequestInit = {
        method,
        headers: headerObj,
        mode: corsMode,
        credentials: corsMode === 'no-cors' ? 'omit' : 'same-origin',
      }

      // Add body for non-GET requests
      if (method !== 'GET' && method !== 'HEAD' && showRequestBody && body) {
        if (bodyFormat === 'json') {
          try {
            // Validate JSON
            JSON.parse(body)
            options.headers = {
              ...headerObj,
              'Content-Type': 'application/json'
            }
            options.body = body
          } catch (e) {
            setError(t('common.error'))
            setLoading(false)
            return
          }
        } else {
          options.body = body
        }
      }

      // Record start time
      const startTime = performance.now()
      
      // Send request
      const res = await fetch(url, options)
      
      // Record end time
      const endTime = performance.now()
      const responseTime = endTime - startTime

      // Process headers
      const responseHeaders: Record<string, string> = {}
      res.headers.forEach((value, key) => {
        responseHeaders[key] = value
      })

      // Process response data
      let data
      
      // If using no-cors mode, we can't access the response content
      if (corsMode === 'no-cors') {
        data = t(`tools.${toolName}.corslimitedaccess`)
      } else {
        const contentType = res.headers.get('content-type')
        if (contentType && contentType.includes('application/json')) {
          try {
            data = await res.json()
          } catch (e) {
            data = await res.text()
          }
        } else {
          data = await res.text()
        }
      }

      // Set response
      setResponse({
        status: res.status,
        statusText: res.statusText,
        headers: responseHeaders,
        data,
        time: Math.round(responseTime)
      })
    } catch (err) {
      setError(t('common.error') + ': ' + (err instanceof Error ? err.message : String(err)))
    } finally {
      setLoading(false)
    }
  }

  // Get status color based on status code
  const getStatusColor = (status: number): string => {
    if (status >= 200 && status < 300) return 'text-green-600'
    if (status >= 300 && status < 400) return 'text-blue-600'
    if (status >= 400 && status < 500) return 'text-yellow-600'
    if (status >= 500) return 'text-red-600'
    return 'text-gray-600'
  }

  return (
    <ToolLayout
      toolName={toolName}
      path="api-tester"
    >
      <ResponsiveToolContainer
        toolName={toolName}
        usage={t(`tools.${toolName}.usage`)}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>{t(`tools.${toolName}.corswarning`)}</strong>
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  {t(`tools.${toolName}.corsworkarounds.title`)}
                </p>
                <ul className="list-disc list-inside text-sm text-yellow-700 ml-2 mt-1">
                  <li>{t(`tools.${toolName}.corsworkarounds.supportedapis`)}</li>
                  <li>{t(`tools.${toolName}.corsworkarounds.nocorsmode`)}</li>
                  <li>{t(`tools.${toolName}.corsworkarounds.corsproxy`)}</li>
                  <li>{t(`tools.${toolName}.corsworkarounds.samedomain`)}</li>
                </ul>
              </div>
            </div>
          </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t(`tools.${toolName}.url`)}</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/endpoint"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t(`tools.${toolName}.method`)}</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value as HttpMethod)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
                <option value="HEAD">HEAD</option>
                <option value="OPTIONS">OPTIONS</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">{t(`tools.${toolName}.corsmode`)}</label>
              <select
                value={corsMode}
                onChange={(e) => setCorsMode(e.target.value as RequestMode)}
                className="p-2 border border-gray-300 rounded-md"
              >
                <option value="cors">{t(`tools.${toolName}.corsoptions.cors`)}</option>
                <option value="no-cors">{t(`tools.${toolName}.corsoptions.nocors`)}</option>
                <option value="same-origin">{t(`tools.${toolName}.corsoptions.sameorigin`)}</option>
              </select>
              {corsMode === 'no-cors' && (
                <p className="mt-1 text-sm text-gray-500">
                  {t(`tools.${toolName}.corslimitedaccess`)}
                </p>
              )}
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700">{t(`tools.${toolName}.headers`)}</label>
                <button
                  type="button"
                  onClick={() => setShowHeaders(!showHeaders)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {showHeaders ? t('common.close') : t('common.show')}
                </button>
              </div>
              
              {showHeaders && (
                <div className="mt-2 space-y-2">
                  {headers.map((header, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={header.key}
                        onChange={(e) => updateHeader(index, 'key', e.target.value)}
                        placeholder={t('common.name')}
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        value={header.value}
                        onChange={(e) => updateHeader(index, 'value', e.target.value)}
                        placeholder={t('common.value')}
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeHeader(index)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addHeader}
                    className="mt-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
                  >
                    {t('common.add')}
                  </button>
                </div>
              )}
            </div>

            {method !== 'GET' && method !== 'HEAD' && (
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">{t(`tools.${toolName}.requestbody`)}</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="json-format"
                        name="body-format"
                        checked={bodyFormat === 'json'}
                        onChange={() => setBodyFormat('json')}
                      />
                      <label htmlFor="json-format" className="text-sm">{t('common.json')}</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="text-format"
                        name="body-format"
                        checked={bodyFormat === 'text'}
                        onChange={() => setBodyFormat('text')}
                      />
                      <label htmlFor="text-format" className="text-sm">{t('common.text')}</label>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowRequestBody(!showRequestBody)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      {showRequestBody ? t('common.close') : t('common.show')}
                    </button>
                  </div>
                </div>
                
                {showRequestBody && (
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder={bodyFormat === 'json' ? '{\n  "key": "value"\n}' : t('common.input')}
                    className="w-full p-2 border border-gray-300 rounded-md mt-2 font-mono"
                    rows={6}
                  />
                )}
              </div>
            )}

            <button
              onClick={sendRequest}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading ? t('common.sending') : t('common.send')}
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {response && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{t(`tools.${toolName}.response`)}</h2>
                <div className="flex items-center space-x-4 mb-2">
                  <span className={`font-mono font-bold ${getStatusColor(response.status)}`}>
                    {response.status} {response.statusText}
                  </span>
                  <span className="text-gray-500">{response.time}ms</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">{t(`tools.${toolName}.responseheaders`)}</h3>
                <div className="bg-gray-50 p-3 rounded-md overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      {Object.entries(response.headers).map(([key, value]) => (
                        <tr key={key}>
                          <td className="pr-4 py-1 font-medium">{key}:</td>
                          <td className="py-1">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">{t(`tools.${toolName}.responsebody`)}</h3>
                <pre className="bg-gray-50 p-3 rounded-md overflow-x-auto font-mono text-sm whitespace-pre-wrap">
                  {typeof response.data === 'object' 
                    ? formatJson(response.data) 
                    : response.data}
                </pre>
              </div>
            </div>
          )}
          
          <div className="mt-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-2">{t(`tools.${toolName}.corsexamples.title`)}</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><code className="bg-gray-100 px-1 py-0.5 rounded">https://jsonplaceholder.typicode.com/posts</code> - {t(`tools.${toolName}.corsexamples.jsonplaceholder`)}</li>
              <li><code className="bg-gray-100 px-1 py-0.5 rounded">https://api.publicapis.org/entries</code> - {t(`tools.${toolName}.corsexamples.publicapis`)}</li>
              <li><code className="bg-gray-100 px-1 py-0.5 rounded">https://dog.ceo/api/breeds/image/random</code> - {t(`tools.${toolName}.corsexamples.dogapi`)}</li>
              <li><code className="bg-gray-100 px-1 py-0.5 rounded">https://api.chucknorris.io/jokes/random</code> - {t(`tools.${toolName}.corsexamples.chucknorris`)}</li>
            </ul>
          </div>
      </ResponsiveToolContainer>
    </ToolLayout>
  )
}
