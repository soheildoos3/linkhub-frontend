"use client";

import { Button } from "@/components/ui/button";
import { Key, LogOut, Trash2, User } from "lucide-react";

interface DashboardHeaderProps {
  onEditProfile: () => void;
  onChangePassword: () => void;
  onDeleteAccount: () => void;
  onLogout: () => void;
}

export function DashboardHeader({
  onEditProfile,
  onChangePassword,
  onDeleteAccount,
  onLogout,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground dark:text-white">
          داشبورد
        </h1>
        <p className="mt-1 text-muted-foreground dark:text-gray-400">
          لینک‌های خود را مدیریت کنید
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={onEditProfile}
          className="gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <User className="h-4 w-4" />
          ویرایش پروفایل
        </Button>
        <Button
          variant="outline"
          onClick={onChangePassword}
          className="gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Key className="h-4 w-4" />
          تغییر رمز
        </Button>
        <Button
          variant="outline"
          onClick={onDeleteAccount}
          className="gap-2 text-destructive hover:bg-destructive/10 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <Trash2 className="h-4 w-4" />
          حذف حساب
        </Button>
        <Button
          variant="outline"
          onClick={onLogout}
          className="gap-2 text-destructive hover:bg-destructive/10 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          <LogOut className="h-4 w-4" />
          خروج
        </Button>
      </div>
    </div>
  );
}