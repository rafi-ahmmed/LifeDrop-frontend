import apiClient from "@/lib/api-client";
import type { TUpdateProfilePayload } from "@/types";

export const uploadProfileImage = (formData: FormData) => {
  return apiClient("/users/upload-profile-image", {
    method: "POST",
    body: formData,
  });
};

export const updatePatientProfile = (payload: TUpdateProfilePayload) => {
  return apiClient("/patients/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};

export const updateDonorProfile = (payload: TUpdateProfilePayload) => {
  return apiClient("/donor/me", {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
