import { useState } from 'react'

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('')
  const [date, setDate] = useState('')

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Unix Timestamp Converter</h1>
      <div className="mb-2">
        <input value={timestamp} onChange={(e) => setTimestamp(e.target.value)} className="w-full p-2 border rounded mb-1" placeholder="Unix Timestamp" />
        <button onClick={convertToDate} className="mr-2 bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-1 px-3 rounded">To Date</button>
        <button onClick={now} className="bg-custom-dark-blue hover:bg-custom-light-blue text-white font-semibold py-1 px-3 rounded">Now</button>
      </div>
      <div className="mb-4">
        <input value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded mb-1" placeholder="Date String" />
        <button onClick={convertToTimestamp} className="bg-custom-light-blue hover:bg-custom-dark-blue text-white font-semibold py-1 px-3 rounded">To Timestamp</button>
      </div>
    </div>
  )
}

