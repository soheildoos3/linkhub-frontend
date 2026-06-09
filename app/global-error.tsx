"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 px-4 py-16 dark:bg-gray-900">
          <div className="text-center">
            <div className="text-destructive/30 mb-4 text-9xl font-bold">
              500
            </div>
            <h1 className="text-foreground mb-2 text-2xl font-bold dark:text-white">
              خطایی رخ داده است!
            </h1>
            <p className="text-muted-foreground mb-8 dark:text-gray-400">
              {error.message || "خطای داخلی سرور"}
            </p>
            <button
              onClick={() => reset()}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-all hover:bg-indigo-700"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
