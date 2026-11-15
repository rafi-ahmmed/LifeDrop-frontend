import apiClient from "@/lib/api-client";
import type {
  DonorRequestStatusAction,
  TDonorMatchingParams,
  TDonorRequestsApiResponse,
} from "@/types";
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

// TODO:
export const deleteBloodRequest = (id: string) => {
  return apiClient(`/blood-requests/${id}`, {
    method: "DELETE",
  });
};

export const matchingDonor = (
  requestId: string,
  params?: TDonorMatchingParams,
) => {
  const query: Record<string, string> = {};
  if (params?.exactDistrict) query.exactDistrict = "true";
  if (params?.exactLocation) query.exactLocation = "true";

  return apiClient(`/blood-requests/match-donors/${requestId}`, {
    method: "GET",
    query,
  });
};

export const sendDonorRequests = (requestId: string, donorIds: string[]) => {
  return apiClient(`/donor-requests/send-requests/${requestId}`, {
    method: "POST",
    body: { donorIds },
  });
};

export const getMyDonorRequests = () => {
  return apiClient<TDonorRequestsApiResponse>("/blood-requests/donor-requests");
};

export const updateDonorRequestStatus = (
  donorRequestId: string,
  status: DonorRequestStatusAction,
) => {
  return apiClient(`/donor-requests/status/${donorRequestId}`, {
    method: "PATCH",
    body: { status },
  });
};

// ? Donors API
