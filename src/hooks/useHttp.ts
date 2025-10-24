"use client"

import { useQueryClient } from "@tanstack/react-query"
import { useState, useCallback } from "react"
import { toast } from "sonner"

// import { useToast } from "@/hooks/use-toast"

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH"

interface UseHttpOptions<TResponse, TBody = unknown> {
  method?: HttpMethod
  body?: TBody
  onSuccess?: (data: TResponse) => void
  onError?: (error: Error) => void
  showSuccessToast?: boolean
  showErrorToast?: boolean
  successMessage?: string
  errorMessage?: string
  invalidateQueries?: readonly unknown[]
}

interface UseHttpReturn<TResponse, TBody = unknown> {
  execute: (executeBody?: TBody) => Promise<TResponse>
  data: TResponse | null
  error: Error | null
  loading: boolean
  reset: () => void
}

export function useHttp<TResponse, TBody = unknown>(
  url: string,
  options?: UseHttpOptions<TResponse, TBody>,
): UseHttpReturn<TResponse, TBody> {

  const queryClient = useQueryClient()

  const [data, setData]       = useState<TResponse | null>(null)
  const [error, setError]     = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    method = "POST",
    body: defaultBody,
    showSuccessToast = true,
    showErrorToast = true,
    successMessage,
    errorMessage,
    invalidateQueries,
  } = options || {}

  const execute = useCallback(
    async (executeBody?: TBody): Promise<TResponse> => {
      setLoading(true)
      setError(null)

      try {
        const payload = executeBody ?? defaultBody

        const fetchOptions: RequestInit = {
          method,
          headers: { "Content-Type": "application/json" },
        }

        if (payload && method !== "GET") {
          fetchOptions.body = JSON.stringify(payload)
        }

        const response = await fetch(url, fetchOptions)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        setData(result)

        // Success toast
        if (showSuccessToast) {
        //   toast({
        //     title: "Success",
        //     description: successMessage || `${method} request successful`,
        //   })
        //
        toast.success("Success", {
          duration: 1000,
          description: successMessage || `${method} request successful`,
          className: '!text-green-800',
          descriptionClassName: '!text-green-700',
          richColors: true,
        })
        }

        // Success callback
        options?.onSuccess?.(result)

        // Invalidate queries if specified
        if (invalidateQueries) {
          queryClient.invalidateQueries({ queryKey: invalidateQueries })
        }

        setLoading(false)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error")
        setError(error)

        // Error toast
        if (showErrorToast) {
          toast.error("Error", {
            duration: 1000,
            description: errorMessage || error.message || `${method} request failed`,
            className: '!text-green-800',
            descriptionClassName: '!text-green-700',
            richColors: true,
          })
        }

        // Error callback
        options?.onError?.(error)

        setLoading(false)
        throw error
      }
    },
    [url, method, defaultBody, queryClient, options, successMessage, errorMessage, showSuccessToast, showErrorToast, invalidateQueries]
  )

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return {
    execute,
    data,
    error,
    loading,
    reset,
  }
}
