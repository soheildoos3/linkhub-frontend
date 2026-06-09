"use client";

import { registerStore } from "@/stores/registerStore";
import { authStore } from "@/stores/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AuthForm } from "@/components/auth/AuthForm";

const registerSchema = z
  .object({
    name: z.string().optional(),
    namelink: z.string().optional(),
    username: z
      .string()
      .min(3)
      .max(50)
      .regex(/^[a-zA-Z0-9-]+$/),
    email: z.string().email(),
    password: z.string().min(6),
    confirm_password: z.string().min(6),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "رمز عبور و تکرار آن مطابقت ندارند",
    path: ["confirm_password"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const {
    isLoading,
    errors: serverErrors,
    register: registerUser,
    clearFieldError,
  } = registerStore();
  const { setUser } = authStore();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      namelink: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  useEffect(() => {
    if (serverErrors.email)
      form.setError("email", { message: serverErrors.email });
    if (serverErrors.username)
      form.setError("username", { message: serverErrors.username });
    if (serverErrors.server)
      form.setError("root", { message: serverErrors.server });
  }, [serverErrors, form]);

  const onSubmit = async (data: RegisterFormData) => {
    form.clearErrors();
    try {
      const user = await registerUser({
        name: data.name || undefined,
        namelink: data.namelink || undefined,
        username: data.username,
        email: data.email,
        password: data.password,
        confirm_password: data.confirm_password,
      });
      setUser(user);
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  const handleFieldChange = (field: string) => {
    clearFieldError(field as any);
    if (field === "email") form.clearErrors("email");
    if (field === "username") form.clearErrors("username");
    if (field === "root") form.clearErrors("root");
  };

  return (
    <AuthForm
      type="register"
      form={form}
      onSubmit={onSubmit}
      isLoading={isLoading}
      serverErrors={serverErrors}
      onFieldChange={handleFieldChange}
    />
  );
}
