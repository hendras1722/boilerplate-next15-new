'use client'

import { useEffect } from 'react'

export default function GlobalErrorLogger() {
  useEffect(() => {
    window.onerror = function (message, source, lineno, colno, error) {
      sendLog('error', 'window.onerror', {
        message: String(message),
        source,
        lineno,
        colno,
        stack: error?.stack,
      })
      return false
    }

    window.onunhandledrejection = function (event) {
      sendLog('error', 'unhandledrejection', {
        message: String(event.reason?.message || event.reason),
        stack: event.reason?.stack,
      })
    }

    const originalConsoleError = console.error
    const originalConsoleWarn = console.warn
    const originalConsoleInfo = console.info

    console.error = (...args) => {
      originalConsoleError(...args)
      sendLog('error', 'console.error', args.map(String).join(' '))
    }

    console.warn = (...args) => {
      originalConsoleWarn(...args)
      sendLog('warn', 'console.warn', args.map(String).join(' '))
    }

    console.info = (...args) => {
      originalConsoleInfo(...args)
      sendLog('info', 'console.info', args.map(String).join(' '))
    }

    const originalFetch = window.fetch
    window.fetch = async (input, init) => {
      try {
        const res = await originalFetch(input, init)
        if (!res.ok) {
          const text = await res.text()
          const msg = `HTTP ${res.status} - ${text}`
          sendLog('error', 'fetch', { url: String(input), message: msg })
        }
        return res
      } catch (err: any) {
        sendLog('error', 'fetch.exception', {
          url: String(input),
          message: err?.message,
        })
        throw err
      }
    }

    return () => {
      console.error = originalConsoleError
      console.warn = originalConsoleWarn
      console.info = originalConsoleInfo
      window.fetch = originalFetch
    }
  }, [])

  function sendLog(level: string, context: string, error: any) {
    fetch('/api/log-error', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ level, context, error }),
    }).catch(() => {})
  }

  return null
}
