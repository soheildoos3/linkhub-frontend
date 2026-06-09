"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
}

export function Pagination({
  currentPage,
  totalPages,
  limit,
}: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const maxVisible = 5;

  if (totalPages <= 1) return null;

  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);

  if (endPage - startPage + 1 < maxVisible) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i,
  );

  const navigateTo = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    params.set("limit", limit.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <Button
        variant="outline"
        onClick={() => navigateTo(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg px-4 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        <ChevronRight className="ml-1 h-4 w-4" />
        قبلی
      </Button>

      {startPage > 1 && (
        <>
          <Button
            variant="ghost"
            onClick={() => navigateTo(1)}
            className="rounded-lg dark:text-gray-300 dark:hover:bg-gray-800"
          >
            1
          </Button>
          {startPage > 2 && (
            <span className="text-muted-foreground px-2 dark:text-gray-500">
              ...
            </span>
          )}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "ghost"}
          onClick={() => navigateTo(page)}
          className="rounded-lg dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="text-muted-foreground px-2 dark:text-gray-500">
              ...
            </span>
          )}
          <Button
            variant="ghost"
            onClick={() => navigateTo(totalPages)}
            className="rounded-lg dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="outline"
        onClick={() => navigateTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg px-4 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
      >
        بعدی
        <ChevronLeft className="mr-1 h-4 w-4" />
      </Button>
    </div>
  );
}
