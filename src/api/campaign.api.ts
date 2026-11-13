import apiClient from "@/lib/api-client";
import type { CreateCampaignPayload } from "@/validation";

export const createCampaign = (payload: CreateCampaignPayload) => {
  const formData = new FormData();
  formData.append("patientName", payload.patientName);
  formData.append("hospitalName", payload.hospitalName ?? "");
  formData.append("contactNumber", payload.contactNumber);
  formData.append("title", payload.title);
  formData.append("description", payload.description);
  formData.append("targetAmount", String(payload.targetAmount));
  formData.append("deadline", payload.deadline.toISOString());

  formData.append("prescription", payload.prescription!);

  payload.medicalReport?.forEach((file) => {
    formData.append("medicalReport", file!);
  });

  return apiClient("/fund-campaigns/create-campaign", {
    method: "POST",
    body: formData,
  });
};
