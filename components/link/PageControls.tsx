"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PageControlsProps {
  total: number;
  skip: number;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
}

export default function PageControls({
  total,
  itemsPerPage,
  currentPage,
}: PageControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLimitChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    params.set("limit", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  if (total === 0) return null;

  const getLimitOptions = () => {
    if (total <= 12) {
      return [{ value: "12", label: "12" }];
    }
    if (total <= 24) {
      return [
        { value: "12", label: "12" },
        { value: "24", label: "24" },
      ];
    }
    if (total <= 48) {
      return [
        { value: "12", label: "12" },
        { value: "24", label: "24" },
        { value: "48", label: "48" },
      ];
    }
    return [
      { value: "12", label: "12" },
      { value: "24", label: "24" },
      { value: "48", label: "48" },
      { value: "96", label: "96" },
    ];
  };

  const limitOptions = getLimitOptions();

  return (
    <div className="mb-6 flex flex-row items-center justify-between gap-4">
      <div className="text-gray-600 dark:text-gray-400">صفحه {currentPage}</div>

      <div className="flex items-center gap-2">
        <Label
          htmlFor="items-per-page"
          className="text-sm text-gray-600 dark:text-gray-400"
        >
          نمایش:
        </Label>

        <Select
          defaultValue={itemsPerPage.toString()}
          onValueChange={handleLimitChange}
        >
          <SelectTrigger
            id="items-per-page"
            className="w-20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            position="popper"
            className="dark:border-gray-700 dark:bg-gray-800"
          >
            <SelectGroup>
              {limitOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="dark:text-white"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
