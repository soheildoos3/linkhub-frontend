"use client";

import { authStore } from "@/stores/authStore";
import { X, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { userService } from "@/services/api/endpoints/user";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeleteAccountModal({
  isOpen,
  onClose,
}: DeleteAccountModalProps) {
  const router = useRouter();
  const { logout } = authStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmText, setConfirmText] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (error) setError("");
  }, [confirmText]);

  const handleDelete = async () => {
    if (confirmText !== "حذف حساب") {
      setError("لطفاً عبارت 'حذف حساب' را به درستی وارد کنید");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await userService.deleteUser();
      await logout();
      router.push("/");
    } catch (err: any) {
      setError(err.detail || "خطا در حذف حساب کاربری");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={modalRef}
        className="border-border bg-card max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg border shadow-xl dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="border-border bg-card sticky top-0 flex items-center justify-between border-b p-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-destructive flex items-center gap-2 text-lg font-bold dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            حذف حساب کاربری
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="dark:text-gray-400 dark:hover:text-white"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="space-y-4 p-4">
          <Alert
            variant="destructive"
            className="border-destructive/50 bg-destructive/10 dark:border-red-800 dark:bg-red-900/20"
          >
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <p className="mb-2 font-semibold dark:text-red-400">⚠️ هشدار!</p>
              <p className="dark:text-red-300">با حذف حساب کاربری:</p>
              <ul className="mt-2 mr-2 list-inside list-disc space-y-1 dark:text-red-300">
                <li>تمام لینک‌های شما برای همیشه حذف می‌شوند</li>
                <li>صفحه عمومی شما غیرفعال می‌شود</li>
                <li>امکان بازیابی اطلاعات وجود ندارد</li>
              </ul>
            </AlertDescription>
          </Alert>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label
              htmlFor="confirm"
              className="text-foreground dark:text-gray-300"
            >
              برای تأیید، عبارت{" "}
              <span className="text-destructive font-bold dark:text-red-400">
                "حذف حساب"
              </span>{" "}
              را وارد کنید
            </Label>
            <Input
              id="confirm"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="حذف حساب"
              className="border-destructive/30 focus:border-destructive focus:ring-destructive/20 dark:border-red-700 dark:bg-gray-900 dark:text-white dark:focus:border-red-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleDelete}
              disabled={isLoading}
              variant="destructive"
              className="flex-1"
            >
              {isLoading ? "در حال حذف..." : "حذف حساب کاربری"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              انصراف
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
