"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, LogOut, Loader2 } from "lucide-react";
import { authStore } from "@/stores/authStore";

interface UserMenuProps {
  getInitial: () => string;
}

export function UserMenu({ getInitial }: UserMenuProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = authStore();

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      router.push("/");
    } catch (error) {
      console.error("خطا در خروج:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hidden h-9 w-9 rounded-full p-0 transition-all hover:scale-105 md:block"
        >
          <Avatar className="h-8 w-8 ring-2 ring-transparent transition-all hover:ring-indigo-500">
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-medium text-white">
              {getInitial()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-2 ml-2 w-56 dark:border-gray-700 dark:bg-gray-800"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm leading-none font-medium dark:text-white">
              {user?.name || user?.username || "کاربر"}
            </p>
            <p className="text-muted-foreground text-xs leading-none dark:text-gray-400">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="dark:bg-gray-700" />
        <DropdownMenuItem asChild>
          <Link
            href="/dashboard"
            className="cursor-pointer dark:text-gray-300 dark:focus:bg-gray-700"
          >
            <User className="ml-2 h-4 w-4" />
            <span>داشبورد</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="dark:bg-gray-700" />
        <DropdownMenuItem
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="cursor-pointer text-red-600 focus:text-red-600 dark:text-red-400"
        >
          {isLoggingOut ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="ml-2 h-4 w-4" />
          )}
          <span>{isLoggingOut ? "در حال خروج..." : "خروج"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
