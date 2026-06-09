import { UserUpdate } from "@/types/user";
import { api } from "../clint";
import { PasswordChange, UserRegister } from "@/types/auth";

export const userService = {
  register: (data: UserRegister) => api.post("/users/register", data),
  getMe: () => api.get("/users/me"),
  updateUser: (data: UserUpdate) => api.patch("/users/me", data),
  changePassword: (data: PasswordChange) =>
    api.put("/users/change-password", data),
  deleteUser: () => api.delete("/users/"),
};
