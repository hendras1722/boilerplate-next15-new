"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import {
  fetchRequest,
  getErrorMessage,
  type RequestOptions,
} from "../lib/ofetch";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface UseHttpOptions<TResponse, TBody = unknown> {
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

export interface UseHttpReturn<TResponse, TBody = unknown> {
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
  const queryClient = useQueryClient();

  // ✅ fix: memoize options agar stabil meski parent kirim object literal baru tiap render
  const stableOptions = useMemo(() => options ?? {}, [JSON.stringify(options)]);

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
    onSuccess,
    onError,
  } = stableOptions;

  const normalizedKey = Array.isArray(key) ? key : key ? [key] : undefined;

  const execute = useCallback(
    async (executeBody?: TBody): Promise<TResponse> => {
      setLoading(true);
      setError(null);

      try {
        const payload = executeBody ?? defaultBody;

        const reqOptions: RequestOptions = {
          ...requestOptions,
          method: method.toLowerCase() as Lowercase<HttpMethod>,
        };

        if (payload && method !== "GET") {
          reqOptions.body = payload as Record<string, unknown>;
        }

        const { data: responseData } = await fetchRequest<TResponse>(
          url,
          reqOptions,
        );

        setData(responseData);

        if (normalizedKey) {
          queryClient.setQueryData(normalizedKey, responseData);
        }

        if (showSuccessToast) {
          toast.success("Success", {
            duration: 1000,
            description: successMessage || `${method} request successful`,
            className: "!text-green-800",
            descriptionClassName: "!text-green-700",
            richColors: true,
          });
        }

        onSuccess?.(responseData);

        if (invalidateQueries) {
          await queryClient.invalidateQueries({ queryKey: invalidateQueries });
        }

        setLoading(false);
        return responseData;
      } catch (err) {
        const errorObj =
          err instanceof Error ? err : new Error("Unknown error");
        setError(errorObj);

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

        onError?.(errorObj);
        setLoading(false);
        throw errorObj;
      }
    },
    [
      url,
      method,
      defaultBody,
      queryClient,
      successMessage,
      errorMessage,
      showSuccessToast,
      showErrorToast,
      invalidateQueries,
      normalizedKey,
      requestOptions,
      onSuccess,
      onError,
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
