import apiClient from "@/lib/api-client";
import type { CreateBloodRequestPayload } from "@/validation";

export const createBloodRequest = (payload: CreateBloodRequestPayload) => {
  return apiClient("/blood-requests/create", {
    method: "POST",
    body: {
      ...payload,
      neededAt: new Date(payload.neededAt).toISOString(),
    },
  });
};

export const getMyBloodRequests = () => {
  return apiClient("/blood-requests/my-requests");
};

export const deleteBloodRequest = (id: string) => {
  return apiClient(`/blood-requests/${id}`, {
    method: "DELETE",
  });
};
