"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Home, LayoutDashboard, LogOut, Loader2, Menu } from "lucide-react";
import { authStore } from "@/stores/authStore";
import { useState } from "react";

interface MobileMenuProps {
  isLoggedIn: boolean;
  isActive: (href: string) => boolean;
  getInitial: () => string;
  onClose: () => void;
}

export function MobileMenu({
  isLoggedIn,
  isActive,
  getInitial,
  onClose,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = authStore();

  const navigation = [
    { name: "خانه", href: "/", icon: Home },
    ...(isLoggedIn
      ? [{ name: "داشبورد", href: "/dashboard", icon: LayoutDashboard }]
      : []),
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      setIsOpen(false);
      onClose();
    } catch (error) {
      console.error("خطا در خروج:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="منو"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[85vw] max-w-sm border-l-0 p-0 sm:w-80 dark:border-gray-800 dark:bg-gray-900"
      >
        <SheetHeader className="border-border border-b p-4 dark:border-gray-800">
          <SheetTitle className="dark:text-white">منوی اصلی</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col p-4">
          {isLoggedIn && (
            <div className="mb-4 flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
                  {getInitial()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium dark:text-white">
                  {user?.name || user?.username || "کاربر"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.email}
                </span>
              </div>
            </div>
          )}

          <div className="flex flex-col space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all ${
                  isActive(item.href)
                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
                onClick={closeMenu}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>

          <div className="border-border mt-4 border-t pt-4 dark:border-gray-800">
            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="w-full gap-2"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <LogOut className="h-4 w-4" />
                )}
                {isLoggingOut ? "در حال خروج..." : "خروج"}
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  variant="outline"
                  asChild
                  className="w-full dark:border-gray-700 dark:text-gray-300"
                >
                  <Link href="/login" onClick={closeMenu}>
                    ورود
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                >
                  <Link href="/register" onClick={closeMenu}>
                    شروع کنید
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
