'use client'

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { Icon } from '@iconify/react'

export interface MultiSelectItem {
  value: string | number
  label: string
  disabled?: boolean
  icon?: string
  children?: MultiSelectItem[]
  onSelect?: (event: React.MouseEvent) => void
}

export interface FetchQuery {
  page: number
  limit: number
  page_size: number
  q: string
  search: string
}

type FetchResult = Record<string, any>

type Variant = 'solid' | 'outline' | 'soft'
type Size = 'sm' | 'md' | 'lg'

interface MultiSelectProps {
  id?: string
  name?: string
  value?: MultiSelectItem | MultiSelectItem[]
  defaultValue?: MultiSelectItem | MultiSelectItem[]
  onChange?: (value?: MultiSelectItem | MultiSelectItem[]) => void
  items?: MultiSelectItem[]
  multiple?: boolean
  url?: string
  limit?: number
  paginated?: boolean
  variant?: Variant
  size?: Size
  transformFetchData?: (result: FetchResult) => MultiSelectItem[]
  transformFetchQuery?: (params: FetchQuery) => Record<string, string | number>
  placeholder?: string
  loading?: boolean
  debounce?: number
  disabled?: boolean
  className?: string
  searchInput?: boolean
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  value,
  defaultValue,
  onChange,
  items = [],
  multiple = false,
  url,
  limit = 10,
  paginated = true,
  variant = 'outline',
  size = 'md',
  transformFetchData = (result: FetchResult) => {
    const data = result?.data ?? result?.results ?? result?.items ?? []
    if (!Array.isArray(data)) return []
    return data.map((val: any) => ({
      value: val.id ?? '',
      label: val.name ?? '',
    }))
  },
  transformFetchQuery = (params) => ({
    q: params.search,
    page: params.page,
    limit: params.limit,
  }),
  placeholder = 'Select...',
  loading = false,
  debounce = 300,
  disabled = false,
  className = '',
  searchInput = true
}) => {
  const [selected, setSelected] = useState<MultiSelectItem | MultiSelectItem[] | undefined>(
    value || defaultValue
  )
  const [data, setData] = useState<MultiSelectItem[]>([])
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(loading)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom')
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isFetchingRef = useRef(false)

  const _items = useMemo(() => (Array.isArray(items) && items.length > 0 ? items : data), [items, data])

  useEffect(() => {
    if (value !== undefined) setSelected(value)
  }, [value])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open])

  // Calculate dropdown position based on available space
  useEffect(() => {
    if (open && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      const dropdownHeight = 320 // max-h-80 = 320px

      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        setDropdownPosition('top')
      } else {
        setDropdownPosition('bottom')
      }
    }
  }, [open])

  // Fetch data function
  const fetchData = useCallback(
    async (currentPage: number, currentSearch: string, append = false) => {
      if (!url || isFetchingRef.current) return

      try {
        isFetchingRef.current = true
        setIsLoading(true)

        const query = transformFetchQuery({
          page: currentPage,
          limit,
          page_size: limit,
          q: currentSearch,
          search: currentSearch,
        })

        const queryString = new URLSearchParams(
          Object.entries(query).map(([k, v]) => [k, String(v)])
        ).toString()

        const res = await fetch(`${url}?${queryString}`)
        const json: FetchResult = await res.json()
        const newData = transformFetchData(json)

        if (append) {
          setData((prev) => [...prev, ...newData])
        } else {
          setData(newData)
        }

        // Check if there's more data
        if (paginated) {
          const hasMoreData = newData.length >= limit
          setHasMore(hasMoreData)
        }
      } catch (err) {
        console.error('Fetch error:', err)
      } finally {
        setIsLoading(false)
        isFetchingRef.current = false
      }
    },
    [url, limit, paginated]
  )

  useEffect(() => {
    if (url && open) {
      setPage(1)
      setHasMore(true)
      setData([])

      const query = transformFetchQuery({
        page: 1,
        limit,
        page_size: limit,
        q: search,
        search: search,
      })

      const queryString = new URLSearchParams(
        Object.entries(query).map(([k, v]) => [k, String(v)])
      ).toString()

      isFetchingRef.current = true
      setIsLoading(true)

      fetch(`${url}?${queryString}`)
        .then((res) => res.json())
        .then((json: FetchResult) => {
          const newData = transformFetchData(json)
          setData(newData)

          if (paginated) {
            setHasMore(newData.length >= limit)
          }
        })
        .catch((err) => console.error('Fetch error:', err))
        .finally(() => {
          setIsLoading(false)
          isFetchingRef.current = false
        })
    }
  }, [open, url])

  useEffect(() => {
    if (!url || !open) return

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current)

    debounceTimeout.current = setTimeout(() => {
      setPage(1)
      setHasMore(true)

      const query = transformFetchQuery({
        page: 1,
        limit,
        page_size: limit,
        q: search,
        search: search,
      })

      const queryString = new URLSearchParams(
        Object.entries(query).map(([k, v]) => [k, String(v)])
      ).toString()

      isFetchingRef.current = true
      setIsLoading(true)

      fetch(`${url}?${queryString}`)
        .then((res) => res.json())
        .then((json: FetchResult) => {
          const newData = transformFetchData(json)
          setData(newData)

          if (paginated) {
            setHasMore(newData.length >= limit)
          }
        })
        .catch((err) => console.error('Fetch error:', err))
        .finally(() => {
          setIsLoading(false)
          isFetchingRef.current = false
        })
    }, debounce)

    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current)
    }
  }, [search])

  // Handle scroll for pagination
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (!paginated || !hasMore || isLoading || !url || isFetchingRef.current) return

      const target = e.currentTarget
      const bottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50

      if (bottom) {
        const nextPage = page + 1
        setPage(nextPage)
        fetchData(nextPage, search, true)
      }
    },
    [paginated, hasMore, isLoading, url, page, search, fetchData]
  )

  const handleSelect = (item: MultiSelectItem) => {
    if (disabled || item.disabled) return

    let newValue: MultiSelectItem | MultiSelectItem[] | undefined

    if (multiple) {
      const current = Array.isArray(selected) ? selected : []
      const exists = current.some((v) => v.value === item.value)
      newValue = exists ? current.filter((v) => v.value !== item.value) : [...current, item]
    } else {
      newValue = item
      setOpen(false)
    }

    setSelected(newValue)
    onChange?.(newValue)
  }

  const isSelected = useCallback(
    (item: MultiSelectItem) => {
      if (multiple && Array.isArray(selected)) {
        return selected.some((v) => v.value === item.value)
      }
      return (selected as MultiSelectItem)?.value === item.value
    },
    [selected, multiple]
  )

  const displayValue = useMemo(() => {
    if (multiple && Array.isArray(selected)) return selected.map((i) => i.label).join(', ')
    if (!multiple && (selected as MultiSelectItem)?.label) return (selected as MultiSelectItem).label
    return ''
  }, [selected, multiple])

  const sizeClasses = {
    sm: 'min-h-[2rem] text-xs px-2 py-1',
    md: 'min-h-[2.5rem] text-sm px-3 py-2',
    lg: 'min-h-[3rem] text-base px-4 py-2.5',
  }[size]

  const variantClasses = {
    outline: 'border border-gray-300 bg-white text-gray-700',
    solid: 'bg-blue-600 text-white border border-blue-600',
    soft: 'bg-blue-50 border border-blue-100 text-blue-700',
  }[variant]

  const dropdownPositionClasses = dropdownPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger */}
      <div
        className={`flex items-center justify-between rounded-md cursor-pointer transition-colors ${sizeClasses} ${variantClasses} ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'
        }`}
        onClick={() => !disabled && setOpen(!open)}
      >
        <span className={displayValue ? 'text-gray-700' : 'text-gray-400'}>
          {displayValue || placeholder}
        </span>
        <Icon
          icon="mdi:chevron-down"
          className={`w-4 h-4 ml-2 transition-transform text-gray-500 ${open ? 'rotate-180' : ''}`}
        />
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className={`absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-hidden flex flex-col ${dropdownPositionClasses}`}
        >
          {/* Search */}
          <div className="p-2 border-b border-gray-200 bg-gray-50">
            <div className="relative">
              <Icon
                icon="mdi:magnify"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              />
              {searchInput && (
              <input
                type="text"
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                autoFocus
              />
              )}
            </div>
          </div>

          <div className="overflow-y-auto flex-1" onScroll={handleScroll}>
            {isLoading && page === 1 ? (
              <div className="flex items-center justify-center py-8 text-gray-500 text-sm">
                <Icon icon="mdi:loading" className="w-5 h-5 animate-spin mr-2" />
                Loading...
              </div>
            ) : _items.length > 0 ? (
              <>
                {_items.map((item) => {
                  const selected = isSelected(item)
                  return (
                    <div
                      key={item.value}
                      className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                        item.disabled
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-gray-50'
                      } ${selected ? 'bg-blue-50' : ''}`}
                      onClick={() => handleSelect(item)}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        {item.icon && <Icon icon={item.icon} className="w-4 h-4 text-gray-500" />}
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </div>
                      {selected && (
                        <Icon icon="mdi:check" className="w-5 h-5 text-blue-600 flex-shrink-0 ml-2" />
                      )}
                    </div>
                  )
                })}
                {isLoading && page > 1 && (
                  <div className="flex items-center justify-center py-3 text-gray-500 text-sm">
                    <Icon icon="mdi:loading" className="w-4 h-4 animate-spin mr-2" />
                    Loading more...
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 text-gray-400 text-sm">No results found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
