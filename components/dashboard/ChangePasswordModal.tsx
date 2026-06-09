"use client";

import { X, Eye, EyeOff, Lock, AlertTriangle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { userService } from "@/services/api/endpoints/user";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
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

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.old_password) {
      setError("رمز عبور فعلی الزامی است");
      return;
    }
    if (formData.new_password.length < 6) {
      setError("رمز عبور جدید باید حداقل ۶ کاراکتر باشد");
      return;
    }
    if (formData.new_password !== formData.confirm_new_password) {
      setError("رمز عبور جدید و تکرار آن مطابقت ندارند");
      return;
    }

    setIsLoading(true);
    try {
      await userService.changePassword({
        old_password: formData.old_password,
        new_password: formData.new_password,
        confirm_new_password: formData.confirm_new_password,
      });

      setSuccess("رمز عبور با موفقیت تغییر کرد");
      setTimeout(() => {
        onClose();
        setFormData({
          old_password: "",
          new_password: "",
          confirm_new_password: "",
        });
        setSuccess("");
      }, 1500);
    } catch (err: any) {
      console.log("Error:", err);
      if (err.detail === "Old password is incorrect") {
        setError("رمز عبور فعلی اشتباه است");
      } else {
        setError(err.detail || "خطا در تغییر رمز عبور");
      }
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
          <h2 className="flex items-center gap-2 text-lg font-bold dark:text-white">
            <Lock className="h-5 w-5" />
            تغییر رمز عبور
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
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="border-green-500 bg-green-50 text-green-800 dark:border-green-700 dark:bg-green-900/30 dark:text-green-400">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label className="dark:text-gray-300">
              رمز عبور فعلی <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showOld ? "text" : "password"}
                value={formData.old_password}
                onChange={(e) =>
                  handleFieldChange("old_password", e.target.value)
                }
                className="pe-10 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowOld(!showOld)}
                className="absolute inset-y-0 left-0 h-full px-3 dark:text-gray-400"
              >
                {showOld ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="dark:text-gray-300">
              رمز عبور جدید <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showNew ? "text" : "password"}
                value={formData.new_password}
                onChange={(e) =>
                  handleFieldChange("new_password", e.target.value)
                }
                className="pe-10 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowNew(!showNew)}
                className="absolute inset-y-0 left-0 h-full px-3 dark:text-gray-400"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
            <p className="text-muted-foreground text-xs dark:text-gray-400">
              حداقل ۶ کاراکتر
            </p>
          </div>

          <div className="space-y-2">
            <Label className="dark:text-gray-300">
              تکرار رمز عبور جدید <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                value={formData.confirm_new_password}
                onChange={(e) =>
                  handleFieldChange("confirm_new_password", e.target.value)
                }
                className="pe-10 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute inset-y-0 left-0 h-full px-3 dark:text-gray-400"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </Button>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "در حال تغییر..." : "تغییر رمز"}
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
