import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = "https://jsonplaceholder.typicode.com/"

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params
  const pathString = path.join("/")

  const searchParams = request.nextUrl.searchParams
  const queryString = searchParams.toString()

  const url = new URL(`${API_BASE_URL}/${pathString}`)
  if (queryString) {
    url.search = queryString
  }

  try {
    const token = request.cookies.get("oauth/token")?.value ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NWQwMmZlYmU5NTAwMjZmOTIwZGFiZiIsImlhdCI6MTc2MTMwMTk3OCwiZXhwIjoxNzYxMzA1NTc4fQ.-o5c0pchYjkUUv2Lcko-JYMCPngEgQQYqD740Z_oLYY"

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await fetch(url.toString(), {
      method: request.method,
      headers,
      body: request.method !== "GET" ? await request.text() : undefined,
    })

    const data = await response.json()

    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json({ error: "Proxy request failed" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleRequest(request, params, "POST")
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleRequest(request, params, "PUT")
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleRequest(request, params, "DELETE")
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleRequest(request, params, "PATCH")
}

async function handleRequest(request: NextRequest, params: Promise<{ path: string[] }>, method: string) {
  const { path } = await params
  const pathString = path.join("/")
  const searchParams = request.nextUrl.searchParams
  const queryString = searchParams.toString()

  const url = new URL(`${API_BASE_URL}/${pathString}`)
  if (queryString) {
    url.search = queryString
  }

  try {
    const token = request.cookies.get("oauth/token")?.value

    const headers: HeadersInit = {
      "Content-Type": "application/json",
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await fetch(url.toString(), {
      method,
      headers,
      body: await request.text(),
    })

    const data = await response.json()
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json({ error: "Proxy request failed" }, { status: 500 })
  }
}
