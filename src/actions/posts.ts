"use client"

import { useHttp } from "@/hooks/useHttp"

export interface Post {
  id: number
  title: string
  body: string
  userId: number
}

export interface CreatePostBody {
  title: string
  body: string
  userId: number
}

export interface UpdatePostBody {
  title: string
  body: string
  userId: number
}

export interface PatchPostBody {
  title?: string
  body?: string
}

// ==================== CRUD HOOKS ====================

export function useGetPosts() {
  const url = `/api/v1/posts`

  return useHttp<Post>(url, {
    method: "GET",
    showSuccessToast: false,
    showErrorToast: true,
  })
}

export function useCreatePost() {
  return useHttp<Post, CreatePostBody>("/api/v1/posts", {
    method: "POST",
    successMessage: "Post created successfully! 🎉",
    errorMessage: "Failed to create post",
  })
}

export function useUpdatePost(id: string) {
  return useHttp<Post, UpdatePostBody>(`/api/v1/posts/${id}`, {
    method: "PUT",
    successMessage: "Post updated successfully! ✅",
    errorMessage: "Failed to update post",
  })
}

export function usePatchPost(id: string) {
  return useHttp<Post, PatchPostBody>(`/api/v1/posts/${id}`, {
    method: "PATCH",
    successMessage: "Post patched successfully! 🔧",
    errorMessage: "Failed to patch post",
  })
}

export function useDeletePost(id: string) {
  return useHttp<{}, void>(`/api/v1/posts/${id}`, {
    method: "DELETE",
    successMessage: "Post deleted successfully! 🗑️",
    errorMessage: "Failed to delete post",
  })
}
