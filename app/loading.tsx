import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="space-y-6 p-6 dark:bg-gray-900">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48 dark:bg-gray-800" />
          <Skeleton className="h-4 w-64 dark:bg-gray-800" />
        </div>
        <Skeleton className="h-10 w-32 dark:bg-gray-800" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="dark:border-gray-700 dark:bg-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24 dark:bg-gray-700" />
              <Skeleton className="h-4 w-4 rounded-full dark:bg-gray-700" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 dark:bg-gray-700" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="dark:border-gray-700 dark:bg-gray-800">
        <CardHeader>
          <Skeleton className="h-6 w-32 dark:bg-gray-700" />
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 w-10 rounded-full dark:bg-gray-700" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4 dark:bg-gray-700" />
                <Skeleton className="h-3 w-1/2 dark:bg-gray-700" />
              </div>
              <Skeleton className="h-8 w-20 dark:bg-gray-700" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
