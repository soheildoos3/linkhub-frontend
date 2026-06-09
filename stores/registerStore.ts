import { create } from "zustand";
import { userService } from "@/services/api/endpoints/user";
import { UserRegister } from "@/types/auth";
import { User } from "@/types/user"; 

type RegisterState = {
  isLoading: boolean;
  errors: {
    username: string;
    email: string;
    server: string;
  };
  register: (data: UserRegister) => Promise<User>;  
  clearFieldError: (field: "username" | "email" | "server") => void;
};

export const registerStore = create<RegisterState>((set) => ({
  isLoading: false,
  errors: {
    username: "",
    email: "",
    server: "",
  },

  register: async (data: UserRegister) => {
    set({ isLoading: true, errors: { username: "", email: "", server: "" } });

    try {
      const user = await userService.register(data);
      set({ isLoading: false });
      return user; 
    } catch (err: any) {
      const errorDetail = err?.detail || "";
      
      const newErrors = {
        username: "",
        email: "",
        server: "",
      };
      
      if (errorDetail === "Email already registered") {
        newErrors.email = "این ایمیل قبلاً ثبت‌نام کرده است";
      } else if (errorDetail === "Username already taken") {
        newErrors.username = "این نام کاربری قبلاً گرفته شده است";
      } else {
        newErrors.server = errorDetail || "خطا در ثبت‌نام";
      }
      
      set({ isLoading: false, errors: newErrors });
      throw err;
    }
  },

  clearFieldError: (field) => {
    set((state) => ({
      errors: { ...state.errors, [field]: "" }
    }));
  },
}));