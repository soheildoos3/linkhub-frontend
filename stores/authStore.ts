import { authService } from "@/services/api/endpoints/auth";
import { userService } from "@/services/api/endpoints/user";
import { UserLogin, UserRegister } from "@/types/auth";
import { User } from "@/types/user";
import { create } from "zustand";

type AuthState = {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  login: (data: UserLogin) => Promise<void>;
  register: (data: UserRegister) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const authStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isLoggedIn: false,

  setUser: (user) => {
    set({ user, isLoggedIn: !!user });
  },

  login: async (data: UserLogin) => {
    try {
      set({ isLoading: true });
      const user = await authService.login(data);
      set({ user, isLoading: false, isLoggedIn: true });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data: UserRegister) => {
    try {
      set({ isLoading: true });
      const user = await userService.register(data);
      set({ user, isLoading: false, isLoggedIn: true });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      await authService.logout();
      set({ user: null, isLoading: false, isLoggedIn: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const user = await userService.getMe();
      set({ user, isLoading: false, isLoggedIn: true });
    } catch {
      set({ user: null, isLoading: false, isLoggedIn: false });
    }
  },
}));
