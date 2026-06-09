"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface AuthFormProps {
  type: "login" | "register";
  form: UseFormReturn<any>;
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
  error?: string | null;
  serverErrors?: {
    email?: string;
    username?: string;
    server?: string;
  };
  onFieldChange?: (field: string) => void;
}

export function AuthForm({
  type,
  form,
  onSubmit,
  isLoading,
  error,
  serverErrors,
  onFieldChange,
}: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const isRegister = type === "register";

  const handleFieldChange = (field: string) => {
    if (onFieldChange) {
      onFieldChange(field);
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <Card className="w-full max-w-md shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold dark:text-white">
            {isRegister ? "ثبت‌نام" : "ورود به حساب"}
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            {isRegister
              ? "یک صفحه اختصاصی برای لینک‌های خود بسازید"
              : "برای مشاهده لینک‌های خود وارد شوید"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {(error || errors.root) && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-center text-sm text-red-600 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
                {error || errors.root?.message}
              </div>
            )}

            {isRegister && (
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium dark:text-gray-300"
                >
                  نام و نام خانوادگی
                  <span className="text-muted-foreground mr-1 text-xs dark:text-gray-500">
                    (اختیاری)
                  </span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="علی رضایی"
                  {...register("name")}
                  onChange={(e) => {
                    register("name").onChange(e);
                    handleFieldChange("name");
                  }}
                  className="dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                />
              </div>
            )}

            {isRegister && (
              <div className="space-y-2">
                <Label
                  htmlFor="namelink"
                  className="text-sm font-medium dark:text-gray-300"
                >
                  نام نمایشی در صفحه عمومی
                  <span className="text-muted-foreground mr-1 text-xs dark:text-gray-500">
                    (اختیاری)
                  </span>
                </Label>
                <Input
                  id="namelink"
                  type="text"
                  placeholder="علی آر"
                  {...register("namelink")}
                  onChange={(e) => {
                    register("namelink").onChange(e);
                    handleFieldChange("namelink");
                  }}
                  className="dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                />
              </div>
            )}

            {isRegister && (
              <div className="space-y-2">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium dark:text-gray-300"
                >
                  نام کاربری{" "}
                  <span className="text-destructive mr-1 text-xs">*</span>
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="ali-rezaei"
                  dir="ltr"
                  {...register("username")}
                  onChange={(e) => {
                    register("username").onChange(e);
                    handleFieldChange("username");
                  }}
                  className={
                    errors.username || serverErrors?.username
                      ? "border-destructive dark:border-red-500 dark:bg-gray-900 dark:text-white"
                      : "dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  }
                />
                {(errors.username || serverErrors?.username) && (
                  <p className="text-destructive mt-1 text-xs">
                    {errors.username?.message || serverErrors?.username}
                  </p>
                )}
                <p className="text-muted-foreground text-xs dark:text-gray-500">
                  فقط حروف انگلیسی، اعداد، خط تیره
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium dark:text-gray-300"
              >
                ایمیل <span className="text-destructive mr-1 text-xs">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ali@example.com"
                {...register("email")}
                onChange={(e) => {
                  register("email").onChange(e);
                  handleFieldChange("email");
                }}
                className={
                  errors.email || serverErrors?.email
                    ? "border-destructive dark:border-red-500 dark:bg-gray-900 dark:text-white"
                    : "dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                }
              />
              {(errors.email || serverErrors?.email) && (
                <p className="text-destructive mt-1 text-xs">
                  {errors.email?.message || serverErrors?.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium dark:text-gray-300"
              >
                رمز عبور{" "}
                <span className="text-destructive mr-1 text-xs">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  {...register("password")}
                  className={
                    errors.password
                      ? "border-destructive pe-10 dark:border-red-500 dark:bg-gray-900 dark:text-white"
                      : "pe-10 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  }
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-0 h-full px-3 py-2"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-destructive mt-1 text-xs">
                  {errors.password.message}
                </p>
              )}
              <p className="text-muted-foreground text-xs dark:text-gray-500">
                حداقل ۶ کاراکتر
              </p>
            </div>

            {isRegister && (
              <div className="space-y-2">
                <Label
                  htmlFor="confirm_password"
                  className="text-sm font-medium dark:text-gray-300"
                >
                  تکرار رمز عبور{" "}
                  <span className="text-destructive mr-1 text-xs">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="confirm_password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••"
                    {...register("confirm_password")}
                    className={
                      errors.confirm_password
                        ? "border-destructive pe-10 dark:border-red-500 dark:bg-gray-900 dark:text-white"
                        : "pe-10 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                    }
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 left-0 h-full px-3 py-2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {errors.confirm_password && (
                  <p className="text-destructive mt-1 text-xs">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full gap-2"
              size="lg"
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : isRegister ? (
                <>ثبت‌نام</>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  ورود
                </>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-muted-foreground text-sm dark:text-gray-400">
            {isRegister ? "قبلاً ثبت‌نام کرده‌اید؟" : "حساب کاربری ندارید؟"}{" "}
            <Link
              href={isRegister ? "/login" : "/register"}
              className="text-primary font-medium hover:underline dark:text-blue-400"
            >
              {isRegister ? "وارد شوید" : "ثبت‌نام کنید"}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
