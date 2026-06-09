"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 px-4 py-16 dark:bg-gray-900">
      <div className="text-center">
        <div className="text-muted-foreground/30 mb-4 text-9xl font-bold dark:text-gray-700">
          404
        </div>

        <h1 className="text-foreground mb-2 text-2xl font-bold sm:text-3xl dark:text-white">
          صفحه پیدا نشد
        </h1>

        <p className="text-muted-foreground mb-8 dark:text-gray-400">
          متأسفیم، صفحه‌ای که به دنبال آن بودید وجود ندارد.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            asChild
            className="gap-2 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <Link href="/">
              <Home className="h-4 w-4" />
              بازگشت به خانه
            </Link>
          </Button>

          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <ArrowRight className="h-4 w-4" />
            بازگشت
          </Button>
        </div>
      </div>
    </div>
  );
}
