import { UserLogin } from "@/types/auth";
import { api } from "../clint";

export const authService = {
  login: (data: UserLogin) => api.post("/auth/login", data),
  logout: () => api.post("/auth/logout"),
};
