"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <div className="flex min-h-screen items-center justify-center p-4">
          <Card className="relative w-full max-w-lg overflow-hidden border-0 shadow-2xl dark:border-gray-800">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-red-100 opacity-30 blur-3xl dark:bg-red-950/30" />
              <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-amber-100 opacity-30 blur-3xl dark:bg-amber-950/30" />
            </div>

            <CardHeader className="relative text-center">
              <div className="mx-auto mb-6 flex h-24 w-24 animate-bounce items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-amber-500 shadow-xl">
                <AlertTriangle
                  className="h-12 w-12 text-white"
                  strokeWidth={1.5}
                />
              </div>
              <CardTitle className="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-7xl font-black text-transparent dark:from-red-400 dark:to-amber-400">
                500
              </CardTitle>
              <CardTitle className="text-foreground mt-4 text-2xl font-bold">
                خطای داخلی سرور
              </CardTitle>
              <CardDescription className="mt-2">
                متأسفیم، مشکلی در سرور رخ داده است
              </CardDescription>
            </CardHeader>

            <CardContent className="relative space-y-4">
              <Alert
                variant="destructive"
                className="border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950/30"
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>خطا</AlertTitle>
                <AlertDescription className="font-mono text-sm">
                  {error.message || "خطای ناشناخته"}
                </AlertDescription>
              </Alert>

              {error.digest && (
                <p className="text-muted-foreground text-center text-xs">
                  شناسه خطا: <span className="font-mono">{error.digest}</span>
                </p>
              )}

              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-muted-foreground text-sm">
                  لطفاً صفحه را Refresh کنید یا بعداً تلاش کنید.
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  اگر مشکل ادامه داشت، با پشتیبانی تماس بگیرید.
                </p>
              </div>
            </CardContent>

            <CardFooter className="relative flex gap-3">
              <Button
                onClick={reset}
                className="flex-1 gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                <RefreshCw className="h-4 w-4" />
                تلاش مجدد
              </Button>
              <Button variant="outline" asChild className="flex-1 gap-2">
                <Link href="/">
                  <Home className="h-4 w-4" />
                  صفحه اصلی
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </body>
    </html>
  );
}
