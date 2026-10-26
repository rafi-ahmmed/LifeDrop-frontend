import apiClient from "@/lib/api-client";
import type {
  donorRegistrationPayload,
  LoginInput,
  patientRegistrationPayload,
  verifyEmailPayloadForApi,
} from "@/types";

export const userLogin = (payload: LoginInput) => {
  return apiClient("/auth/login", { method: "POST", body: payload });
};

export const getMe = () => {
  return apiClient("/auth/getMe");
};

export const patientRegister = (payload: patientRegistrationPayload) => {
  return apiClient("/auth/register/patient", { method: "POST", body: payload });
};

export const DonorRegister = (payload: donorRegistrationPayload) => {
  return apiClient("/auth/register/donor", { method: "POST", body: payload });
};

export const verifyEmail = (payload: verifyEmailPayloadForApi) => {
  return apiClient("/auth/verify-email", { method: "POST", body: payload });
};

export const logOut = () => {
  return apiClient("/auth/logOut");
};
