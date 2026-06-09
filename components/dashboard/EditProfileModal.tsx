"use client";

import { userService } from "@/services/api/endpoints/user";
import { authStore } from "@/stores/authStore";
import { User, UserUpdate } from "@/types/user";
import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useRouter } from "next/navigation";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export function EditProfileModal({
  isOpen,
  onClose,
  user,
}: EditProfileModalProps) {
  const router = useRouter();
  const { checkAuth, logout } = authStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
  });
  const [formData, setFormData] = useState<UserUpdate>({
    name: user.name || "",
    namelink: user.namelink || "",
    username: user.username,
    email: user.email,
  });

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

  const normalizeUsername = (username: string) => {
    return username
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase();
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: "", email: "" };

    if (formData.username && formData.username !== user.username) {
      if (!formData.username.trim()) {
        newErrors.username = "نام کاربری الزامی است";
        isValid = false;
      } else if (formData.username.length < 3) {
        newErrors.username = "نام کاربری باید حداقل ۳ کاراکتر باشد";
        isValid = false;
      } else if (!/^[a-zA-Z0-9-]+$/.test(formData.username)) {
        newErrors.username = "فقط حروف انگلیسی، اعداد و خط تیره مجاز است";
        isValid = false;
      }
    }

    if (formData.email && formData.email !== user.email) {
      if (!formData.email.trim()) {
        newErrors.email = "ایمیل الزامی است";
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "ایمیل نامعتبر است";
        isValid = false;
      }
    }

    setFieldErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({ username: "", email: "" });

    if (!validateForm()) return;

    const submitData: UserUpdate = {};
    let usernameChanged = false;

    if (formData.name !== user.name)
      submitData.name = formData.name || undefined;
    if (formData.namelink !== user.namelink)
      submitData.namelink = formData.namelink || undefined;

    if (formData.username !== user.username) {
      submitData.username = normalizeUsername(formData.username);
      usernameChanged = true;
    }

    if (formData.email !== user.email) submitData.email = formData.email;

    if (Object.keys(submitData).length === 0) {
      onClose();
      return;
    }

    setIsLoading(true);

    try {
      await userService.updateUser(submitData);

      if (usernameChanged) {
        await logout();
        router.push(
          "/login?message=نام کاربری تغییر کرد. لطفاً دوباره وارد شوید.",
        );
      } else {
        await checkAuth();
        onClose();
      }
    } catch (err: any) {
      const errorDetail = err?.detail || "";
      if (errorDetail === "Username already taken") {
        setFieldErrors((prev) => ({
          ...prev,
          username: "این نام کاربری قبلاً گرفته شده است",
        }));
      } else if (errorDetail === "Email already used") {
        setFieldErrors((prev) => ({
          ...prev,
          email: "این ایمیل قبلاً ثبت‌نام کرده است",
        }));
      } else {
        setError(errorDetail || "خطا در ویرایش پروفایل");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "username" && fieldErrors.username) {
      setFieldErrors((prev) => ({ ...prev, username: "" }));
    }
    if (field === "email" && fieldErrors.email) {
      setFieldErrors((prev) => ({ ...prev, email: "" }));
    }
    if (error) setError("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        ref={modalRef}
        className="border-border bg-card max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg border shadow-xl dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="border-border bg-card sticky top-0 flex items-center justify-between border-b p-4 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="text-foreground text-lg font-bold dark:text-white">
            ویرایش پروفایل
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

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="dark:text-gray-300">
              نام و نام خانوادگی
              <span className="text-muted-foreground mr-1 text-xs dark:text-gray-500">
                (اختیاری)
              </span>
            </Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              className="dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="namelink" className="dark:text-gray-300">
              نام نمایشی در صفحه عمومی
              <span className="text-muted-foreground mr-1 text-xs dark:text-gray-500">
                (اختیاری)
              </span>
            </Label>
            <Input
              id="namelink"
              value={formData.namelink || ""}
              onChange={(e) => handleFieldChange("namelink", e.target.value)}
              className="dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
            <p className="text-muted-foreground text-xs dark:text-gray-400">
              اگر خالی بماند، نام کاربری نمایش داده می‌شود
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="dark:text-gray-300">
              نام کاربری <span className="text-destructive">*</span>
            </Label>
            <Input
              id="username"
              required
              value={formData.username}
              onChange={(e) => handleFieldChange("username", e.target.value)}
              dir="ltr"
              className={
                fieldErrors.username
                  ? "border-destructive dark:border-red-500 dark:bg-gray-900 dark:text-white"
                  : "dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              }
            />
            {fieldErrors.username && (
              <p className="text-destructive mt-1 text-xs">
                {fieldErrors.username}
              </p>
            )}
            <p className="text-muted-foreground text-xs dark:text-gray-400">
              فقط حروف انگلیسی، اعداد و خط تیره
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="dark:text-gray-300">
              ایمیل <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleFieldChange("email", e.target.value)}
              className={
                fieldErrors.email
                  ? "border-destructive dark:border-red-500 dark:bg-gray-900 dark:text-white"
                  : "dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              }
            />
            {fieldErrors.email && (
              <p className="text-destructive mt-1 text-xs">
                {fieldErrors.email}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "در حال ذخیره..." : "ذخیره تغییرات"}
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
        </form>
      </div>
    </div>
  );
}