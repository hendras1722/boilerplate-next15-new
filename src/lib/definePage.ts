
export interface DefinePageOptions {
  meta?: Record<string, any>
  layout?: string
  [key: string]: any
}

function getGlobalRegistry(): Map<string, DefinePageOptions> {
  if (!(globalThis as any).__PAGE_META_REGISTRY__) {
    (globalThis as any).__PAGE_META_REGISTRY__ = new Map<string, DefinePageOptions>()
  }
  return (globalThis as any).__PAGE_META_REGISTRY__
}

function getCallerPath(): string {
  try {
    const err   = new Error()
    const stack = err.stack || ''
    const match = stack.match(/app[\\/](.+?)\.(page|layout|template)\.tsx/)
    return match ? match[1] : `unknown_${Date.now()}`
  } catch {
    return `unknown_${Date.now()}`
  }
}

export function definePage(options: DefinePageOptions) {
  const path     = getCallerPath()
  const registry = getGlobalRegistry()
  registry.set(path, options)

  if (!options) {
     import('./route-store').then(({ setRouteData }) => setRouteData(null as any))
     return
   }

  if (typeof window !== 'undefined') {
    import('./route-store').then(({ setRouteData }) => {
      if (options) {
        setRouteData(options)
      }

    })
  } else {
    (async () => {
        try {
          const { setRouteData } = await import('./route-store')
          setRouteData(options)
        } catch {
          // noop
        }
    })()
  }

  return options
}

/**
 * Ambil meta berdasarkan path (manual)
 */
export function getPageMetaByPath(path: string) {
  const registry = getGlobalRegistry()
  return registry.get(path)
}

/**
 * Ambil meta halaman aktif (otomatis, fallback ke terakhir yang dieksekusi)
 */
export function getCurrentPageMeta() {
  const registry = getGlobalRegistry()
  const entries  = Array.from(registry.entries())
  if (!entries.length) return null
  const [path, meta] = entries[entries.length - 1]
  return { path, ...meta }
}
