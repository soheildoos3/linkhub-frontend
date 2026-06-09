"use client";

import Link from "next/link";
import { LinkIcon } from "lucide-react";

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 rounded-lg transition-all hover:opacity-80"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg transition-all group-hover:scale-105 group-hover:shadow-xl">
        <LinkIcon className="h-4 w-4 text-white" />
      </div>
      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent dark:from-indigo-400 dark:to-purple-400">
        LinkHub
      </span>
    </Link>
  );
}
