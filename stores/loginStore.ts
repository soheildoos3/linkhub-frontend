import { create } from "zustand";
import { authService } from "@/services/api/endpoints/auth";
import { UserLogin } from "@/types/auth";
import { User } from "@/types/user";

type LoginState = {
  isLoading: boolean;
  error: string;
  login: (data: UserLogin) => Promise<User>;
  clearError: () => void;
};

export const loginStore = create<LoginState>((set) => ({
  isLoading: false,
  error: "",

  login: async (data: UserLogin) => {
    set({ isLoading: true, error: "" });

    try {
      const user = await authService.login(data);
      set({ isLoading: false });
      return user;
    } catch (err: any) {
      const errorDetail = err?.detail || "";

      let errorMessage = "خطا در ورود به حساب کاربری";

      if (errorDetail === "Invalid credentials") {
        errorMessage = "ایمیل یا رمز عبور اشتباه است";
      } else if (errorDetail === "Email not found") {
        errorMessage = "این ایمیل در سیستم ثبت نشده است";
      } else if (errorDetail) {
        errorMessage = `${errorDetail}`;
      }

      set({ isLoading: false, error: errorMessage });
      throw err;
    }
  },

  clearError: () => {
    set({ error: "" });
  },
}));
