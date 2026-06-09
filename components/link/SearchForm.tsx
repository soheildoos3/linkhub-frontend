"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2 } from "lucide-react";

interface SearchFormProps {
  initialSearch: string;
}

export default function SearchForm({ initialSearch }: SearchFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [isLoading, setIsLoading] = useState(false);

  const performSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value.trim()) {
        params.set("search", value.trim());
      } else {
        params.delete("search");
      }
      params.delete("page");

      router.push(`${pathname}?${params.toString()}`);
      setIsLoading(false);
    },
    [router, pathname, searchParams],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== initialSearch) {
        setIsLoading(true);
        performSearch(searchValue);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue, performSearch, initialSearch]);

  const handleClear = () => {
    setSearchValue("");
    setIsLoading(true);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mx-auto mb-8 max-w-md"
    >
      <div className="relative">
        <Input
          type="text"
          name="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="جستجوی کاربران..."
          className="h-10 pr-10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          autoComplete="off"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          ) : (
            <Search className="h-4 w-4 text-gray-400" />
          )}
        </div>
        {searchValue && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute inset-y-0 left-0 h-full px-3"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  );
}
