import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // دیباگ - ببینیم توکن هست یا نه و کجا هستیم
  console.log(`[Middleware] Path: ${pathname}`);
  console.log(`[Middleware] Token exists: ${!!token}`);

  const publicPaths = ["/login", "/register", "/"];
  const isPublicPath = publicPaths.some((path) => pathname === path);

  const protectedPaths = ["/dashboard"];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  // اگه توکن داره و میخواد بره لاگین/رجیستر → ببر داشبورد
  if (token && (pathname === "/login" || pathname === "/register")) {
    console.log("[Middleware] Redirecting to /dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // اگه توکن نداره و میخواد بره داشبورد → ببر لاگین
  if (!token && isProtectedPath) {
    console.log("[Middleware] Redirecting to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("[Middleware] No redirect, passing through");
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|fonts).*)"],
};