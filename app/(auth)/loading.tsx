import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthLoading() {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center bg-gray-50 px-4 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Loader2 className="text-primary h-12 w-12 animate-spin dark:text-blue-400" />
          <p className="text-muted-foreground mt-4 text-sm dark:text-gray-400">
            در حال آماده‌سازی...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
