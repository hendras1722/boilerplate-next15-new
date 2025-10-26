import { NextRequest, NextResponse } from "next/server";

const PUBLIC_ROUTES = ["/"];
const AUTH_ROUTES   = [
  "/login",
  "/register",
  "/change-password",
  "/forgot-password",
  "/callback",
];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token        = request.cookies.get("oauth/token")?.value || null;

  if (request.headers.get("x-internal-middleware") === "true") {
    return NextResponse.next();
  }

  const isPublicRoute    = PUBLIC_ROUTES.includes(pathname);
  const isAuthRoute      = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isProtectedRoute = pathname.startsWith("/admin");

  const apiUrl = new URL("/api/auth/getme", request.url);

  if (isPublicRoute) return NextResponse.next();

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const res = await fetch(apiUrl.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-internal-middleware": "true",
        },
      });

      if (!res.ok) {
        const response = NextResponse.redirect(new URL("/login", request.url));
        response.cookies.delete("token");
        return response;
      }

      return NextResponse.next();
    } catch (err) {
      console.error("❌ Error validating token:", err);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  if (token && isAuthRoute && request.method === "GET") {
    try {
      const res = await fetch(apiUrl.toString(), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "x-internal-middleware": "true",
        },
      });

      if (res.ok) {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } else {
        const response = NextResponse.next();
        response.cookies.delete("token");
        return response;
      }
    } catch (err: any) {
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }
  }

  // Default → lanjut aja
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
