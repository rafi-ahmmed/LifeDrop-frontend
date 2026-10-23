import apiClient from "@/lib/api-client";
import type { LoginInput } from "@/validation";

export const userLogin = (payload: LoginInput) => {
  return apiClient("/auth/login", { method: "POST", body: payload });
};

export const getMe = () => {
  return apiClient("/auth/getMe");
};

export const logOut = () => {
  return apiClient("/auth/logOut");
};
