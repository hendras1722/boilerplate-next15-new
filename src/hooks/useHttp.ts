"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import {
  fetchRequest,
  getErrorMessage,
  type RequestOptions,
} from "../lib/ofetch";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface UseHttpOptions<TResponse, TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: Error) => void;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  successMessage?: string;
  errorMessage?: string;
  invalidateQueries?: readonly unknown[];
  /** Custom key untuk identifikasi unik request */
  key?: string | readonly unknown[];
  /** Additional request options */
  requestOptions?: Omit<RequestOptions, "method" | "body">;
}

interface UseHttpReturn<TResponse, TBody = unknown> {
  execute: (executeBody?: TBody) => Promise<TResponse>;
  data: TResponse | null;
  error: Error | null;
  loading: boolean;
  reset: () => void;
  key?: string | readonly unknown[];
}

export function useHttp<TResponse, TBody = unknown>(
  url: string,
  options?: UseHttpOptions<TResponse, TBody>,
): UseHttpReturn<TResponse, TBody> {
  const queryClient           = useQueryClient();
  const [data, setData]       = useState<TResponse | null>(null);
  const [error, setError]     = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    method = "POST",
    body: defaultBody,
    showSuccessToast = true,
    showErrorToast = true,
    successMessage,
    errorMessage,
    invalidateQueries,
    key,
    requestOptions,
  } = options || {};

  const normalizedKey = Array.isArray(key) ? key : key ? [key] : undefined;

  const execute = useCallback(
    async (executeBody?: TBody): Promise<TResponse> => {
      setLoading(true);
      setError(null);

      try {
        const payload = executeBody ?? defaultBody;

        // Prepare request options
        const reqOptions: RequestOptions = {
          ...requestOptions,
          method: method.toLowerCase() as Lowercase<HttpMethod>,
        };

        // Add body for non-GET requests
        if (payload && method !== "GET") {
          reqOptions.body = payload as Record<string, unknown>;
        }

        // Make request - fetchRequest is a regular function, not a hook
        const { data: responseData } = await fetchRequest<TResponse>(
          url,
          reqOptions,
        );

        setData(responseData);

        // Update react-query cache if key is provided
        if (normalizedKey) {
          queryClient.setQueryData(normalizedKey, responseData);
        }

        // Show success toast
        if (showSuccessToast) {
          toast.success("Success", {
            duration: 1000,
            description: successMessage || `${method} request successful`,
            className: "!text-green-800",
            descriptionClassName: "!text-green-700",
            richColors: true,
          });
        }

        // Call success callback
        options?.onSuccess?.(responseData);

        // Invalidate queries if specified
        if (invalidateQueries) {
          await queryClient.invalidateQueries({ queryKey: invalidateQueries });
        }

        setLoading(false);
        return responseData;
      } catch (err) {
        const errorObj =
          err instanceof Error ? err : new Error("Unknown error");
        setError(errorObj);

        // Show error toast
        if (showErrorToast) {
          const message = errorMessage || getErrorMessage(err);

          toast.error("Error", {
            duration: 2000,
            description: message,
            className: "!text-red-800",
            descriptionClassName: "!text-red-700",
            richColors: true,
          });
        }

        // Call error callback
        options?.onError?.(errorObj);

        setLoading(false);
        throw errorObj;
      }
    },
    [
      url,
      method,
      defaultBody,
      queryClient,
      options,
      successMessage,
      errorMessage,
      showSuccessToast,
      showErrorToast,
      invalidateQueries,
      normalizedKey,
      requestOptions,
    ],
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return {
    execute,
    data,
    error,
    loading,
    reset,
    key,
  };
}
