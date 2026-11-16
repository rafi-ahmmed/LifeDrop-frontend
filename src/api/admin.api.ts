import apiClient from "@/lib/api-client";
import type {
  TAdminStatsResponse,
  TAllBloodRequestsResponse,
  TUpdateStatusPayload,
} from "@/types";

export const getAdminStats = () => {
  return apiClient<TAdminStatsResponse>("/admin/dashboard-stats");
};

export const getAllBloodRequests = (queryString: string) => {
  return apiClient<TAllBloodRequestsResponse>(
    `/blood-requests/all?${queryString}`,
  );
};

export const updateBloodRequestStatus = ({
  id,
  payload,
}: {
  id: string;
  payload: TUpdateStatusPayload;
}) => {
  return apiClient(`/blood-requests/status/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
