"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Link as LinkIcon,
  Plus,
  RefreshCw,
  Trash2,
  Loader2,
} from "lucide-react";

interface StatsCardProps {
  linksCount: number;
  isLoading: boolean;
  isDeleting?: boolean;
  onAddLink: () => void;
  onRefresh: () => void;
  onDeleteAll: () => void;
}

export function StatsCard({
  linksCount,
  isLoading,
  isDeleting = false,
  onAddLink,
  onRefresh,
  onDeleteAll,
}: StatsCardProps) {
  return (
    <Card className="mb-6 dark:border-gray-700 dark:bg-gray-800">
      <CardContent className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex items-center gap-2 rounded-full p-2 dark:bg-indigo-900/30 dark:text-indigo-400">
              <LinkIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm dark:text-gray-400">
                تعداد لینک‌ها
              </p>
              <p className="text-foreground text-2xl font-bold dark:text-white">
                {linksCount}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button onClick={onAddLink} className="gap-2">
              <Plus className="h-4 w-4" />
              لینک جدید
            </Button>
            {linksCount > 0 && (
              <>
                <Button
                  variant="outline"
                  onClick={onRefresh}
                  size="icon"
                  title="بازخوانی"
                  disabled={isLoading}
                  className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                  />
                </Button>
                <Button
                  variant="outline"
                  onClick={onDeleteAll}
                  disabled={isDeleting}
                  className="text-destructive hover:bg-destructive/10 gap-2 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  حذف همه
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
