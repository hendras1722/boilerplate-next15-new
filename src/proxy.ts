import { type NextRequest, NextResponse } from "next/server";
import { ofetch } from "ofetch";

const PUBLIC_ROUTES  = ["/"];
const AUTH_ROUTES    = ["/login", "/register", "/change-password", "/forgot-password", "/callback"];
const PATH_PROTECTED = ["/admin"];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token        = request.cookies.get("token")?.value || null;
  const baseURL      = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  if (request.headers.get("x-internal-middleware") === "true") {
    return NextResponse.next();
  }

  const isPublicRoute    = PUBLIC_ROUTES.includes(pathname);
  const isAuthRoute      = AUTH_ROUTES.some((route) => pathname.startsWith(route));
  const isProtectedRoute = PATH_PROTECTED.some((route) => pathname.startsWith(route));

  if (isPublicRoute) return NextResponse.next();

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await ofetch(`${baseURL}/api/getme`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

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
      await ofetch(`${baseURL}/api/getme`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      // If token is valid, redirect to dashboard
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } catch (_err) {
      // Token is invalid, clear cookie and allow access to auth page
      const response = NextResponse.next();
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
