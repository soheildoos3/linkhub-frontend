"use client";

import { authStore } from "@/stores/authStore";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, checkAuth } = authStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
