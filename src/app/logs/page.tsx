'use client'

import { useEffect, useState } from 'react'

export default function LogsPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [filter, setFilter] = useState<'all' | 'info' | 'warn' | 'error'>('all')

  const fetchLogs = async () => {
    const res = await fetch('/api/logs')
    const data = await res.json()
    setLogs(data)
  }

  useEffect(() => {
    fetchLogs()
    const interval = setInterval(fetchLogs, 2000)
    return () => clearInterval(interval)
  }, [])

  const filteredLogs =
    filter === 'all' ? logs : logs.filter((log) => log.level === filter)

  return (
    <div className="p-4 font-mono text-sm space-y-2">
      <h1 className="text-lg font-bold mb-3">🧾 Application Logs</h1>

      <div className="flex gap-2 mb-3">
        {['all', 'info', 'warn', 'error'].map((lvl) => (
          <button
            key={lvl}
            onClick={() => setFilter(lvl as any)}
            className={`px-3 py-1 rounded text-white ${
              filter === lvl
                ? lvl === 'error'
                  ? 'bg-red-500'
                  : lvl === 'warn'
                  ? 'bg-yellow-500'
                  : lvl === 'info'
                  ? 'bg-blue-500'
                  : 'bg-gray-700'
                : 'bg-gray-400 opacity-60'
            }`}
          >
            {lvl.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="space-y-1 max-h-[80vh] overflow-auto">
        {filteredLogs.map((log, i) => (
          <div
            key={i}
            className={`border-b p-2 rounded ${
              log.level === 'error'
                ? 'bg-red-100 text-red-800'
                : log.level === 'warn'
                ? 'bg-yellow-100 text-yellow-800'
                : log.level === 'info'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <div className="text-xs opacity-60">
              [{log.timestamp}] {log.context}
            </div>
            <div>{log.message}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
