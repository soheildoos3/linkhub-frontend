import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  // روش جدید: از next/headers برای دسترسی به کوکی
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  
  const { pathname } = request.nextUrl;

  // مسیرهای عمومی
  const publicPaths = ["/login", "/register", "/"];
  const isPublicPath = publicPaths.includes(pathname);
  
  // مسیرهای عمومی داینامیک (صفحات کاربران مثل /username)
  const isUserPublicPath = /^\/[a-zA-Z0-9-]+$/.test(pathname);
  
  // مسیرهای محافظت شده (نیاز به لاگین)
  const isProtectedPath = pathname.startsWith("/dashboard");

  // اگه کاربر توکن داره و میخواد بره لاگین/رجیستر → ببر داشبورد
  if (token && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // اگه کاربر توکن نداره و میخواد بره داشبورد → ببر لاگین
  if (!token && isProtectedPath) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
  console.log(token)
  // بقیه موارد رو آزاد بذار
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|fonts|icons|images).*)",
  ],
};