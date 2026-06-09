"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <div className="h-5 w-5" />
      </Button>
    );
  }

  const isDark =
    theme === "dark" || (theme === "system" && resolvedTheme === "dark");

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="h-9 w-9"
      aria-label="تغییر تم"
    >
      {isDark ? (
        <Moon className="h-5 w-5 text-slate-700 transition-transform duration-300 hover:scale-110 hover:-rotate-12 dark:text-slate-200" />
      ) : (
        <Sun className="h-5 w-5 text-amber-500 transition-transform duration-300 hover:scale-110 hover:rotate-12" />
      )}
    </Button>
  );
}
