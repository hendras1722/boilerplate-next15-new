"use client";

import { useHttp } from "@/hooks/useHttp";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

interface BaseResponseLogin<T> {
  code: number;
  message: string;
  data: T;
}

export function useLogin() {
  return useHttp<BaseResponseLogin<LoginRequest>, LoginRequest>(
    "/api/auth/auth/login",
    {
      method: "POST",
      onSuccess: (data) => {
        window.location.href = "/admin/dashboard";
      },
    },
  );
}
