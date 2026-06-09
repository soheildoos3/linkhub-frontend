import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // فقط برای دیباگ - بعداً پاکش کن
  console.log(`[Middleware] Path: ${pathname}, Token: ${token ? "✅ exists" : "❌ missing"}`);

  const publicPaths = ["/login", "/register", "/", "/explore"];
  const isPublicPath =
    publicPaths.some((path) => pathname === path) ||
    pathname.match(/^\/[a-zA-Z0-9-]+$/) !== null;

  const protectedPaths = ["/dashboard"];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  if (token && (pathname === "/login" || pathname === "/register")) {
    console.log("[Middleware] Redirecting to /dashboard (has token)");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && isProtectedPath) {
    console.log("[Middleware] Redirecting to /login (no token)");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}