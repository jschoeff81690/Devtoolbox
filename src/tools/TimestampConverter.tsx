import { useState } from 'react'
import ToolLayout from '../components/ToolLayout'
import ResponsiveToolContainer from '../components/ResponsiveToolContainer';
import { useTranslation } from 'react-i18next';

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('')
  const [date, setDate] = useState('')
  const { t } = useTranslation();
  const toolName = 'timestampconverter';

  const convertToDate = () => {
    const ts = parseInt(timestamp)
    if (!isNaN(ts)) {
      setDate(new Date(ts * 1000).toLocaleString())
    } else {
      setDate('Invalid timestamp')
    }
  }

  const convertToTimestamp = () => {
    const d = new Date(date)
    if (!isNaN(d.getTime())) {
      setTimestamp(Math.floor(d.getTime() / 1000).toString())
    } else {
      setTimestamp('Invalid date')
    }
  }

  const now = () => {
    const now = Math.floor(Date.now() / 1000).toString()
    setTimestamp(now)
    setDate(new Date().toLocaleString())
  }

  return (
    <ToolLayout
      toolName={toolName}
      path="timestamp-converter"
    >
      <ResponsiveToolContainer
        toolName={toolName}
        usage={t(`tools.${toolName}.usage`)}
      >
        <div className="mb-2">
          <input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="w-full p-2 border rounded mb-1" placeholder="Unix Timestamp" />
          <button onClick={convertToDate} className="mr-2 bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-1 px-3 rounded">{t(`tools.${toolName}.todatetime`)}</button>
          <button onClick={now} className="bg-custom-dark-blue hover:bg-custom-light-blue text-white font-semibold py-1 px-3 rounded">{t(`tools.${toolName}.now`)}</button>
        </div>
        <div className="mb-4">
          <input value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded mb-1" placeholder="Date String" />
          <button onClick={convertToTimestamp} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-1 px-3 rounded">{t(`tools.${toolName}.totimestamp`)}</button>
        </div>
      </ResponsiveToolContainer>
    </ToolLayout>
  )
}

