"use client";

import { authStore } from "@/stores/authStore";
import { Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isLoggedIn, checkAuth } = authStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // کنترل دسترسی بعد از لود شدن
  useEffect(() => {
    if (isLoading) return;

    const protectedPaths = ["/dashboard"];
    const isProtectedPath = protectedPaths.some((path) =>
      pathname.startsWith(path)
    );

    // اگه لاگین نیست و میخواد بره مسیر محافظت شده → ببر لاگین
    if (!isLoggedIn && isProtectedPath) {
      router.push("/login");
    }

    // اگه لاگین هست و میخواد بره لاگین یا ثبت‌نام → ببر داشبورد
    if (isLoggedIn && (pathname === "/login" || pathname === "/register")) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <Loader2 className="text-primary h-12 w-12 animate-spin" />
        <p className="text-muted-foreground text-sm">در حال بارگذاری...</p>
      </div>
    );
  }

  return <>{children}</>;
}