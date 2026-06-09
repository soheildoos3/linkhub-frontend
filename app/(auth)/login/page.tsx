"use client";

import { loginStore } from "@/stores/loginStore";
import { authStore } from "@/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AuthForm } from "@/components/auth/AuthForm";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { isLoading, error, login, clearError } = loginStore();
  const { setUser } = authStore();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginFormData) => {
    form.clearErrors();
    clearError();
    try {
      const user = await login(data);
      setUser(user);
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleFieldChange = () => {
    if (error) {
      clearError();
      form.clearErrors();
    }
  };

  return (
    <AuthForm
      type="login"
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      error={error}
      onFieldChange={handleFieldChange}
    />
  );
}
