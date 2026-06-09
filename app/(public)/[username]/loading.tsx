import { Skeleton } from "@/components/ui/skeleton";

export default function UserPageLoading() {
  return (
    <div className="container mx-auto px-4 py-12 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <Skeleton className="mx-auto mb-4 h-20 w-20 rounded-full dark:bg-gray-800" />
          <Skeleton className="mx-auto mb-2 h-8 w-48 dark:bg-gray-800" />
          <Skeleton className="mx-auto h-6 w-32 dark:bg-gray-800" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border-border bg-card flex items-center gap-4 rounded-xl border p-4 dark:border-gray-700 dark:bg-gray-800"
            >
              <Skeleton className="h-12 w-12 shrink-0 rounded-full dark:bg-gray-700" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4 dark:bg-gray-700" />
                <Skeleton className="h-3 w-1/2 dark:bg-gray-700" />
              </div>
              <Skeleton className="h-8 w-8 shrink-0 rounded-full dark:bg-gray-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
