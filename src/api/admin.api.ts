import apiClient from "@/lib/api-client";
import type {
  TAdminStatsResponse,
  TAllBloodRequestsResponse,
  TAllCampaignsResponse,
  TAllUsersResponse,
  TReviewCampaignPayload,
  TUpdateStatusPayload,
  TUpdateUserStatusPayload,
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

export const getAllUsers = () => {
  return apiClient<TAllUsersResponse>("/admin/users");
};

export const updateUserStatus = ({
  id,
  payload,
}: {
  id: string;
  payload: TUpdateUserStatusPayload;
}) => {
  return apiClient(`/admin/users/role/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};

export const getAllAdminCampaigns = () => {
  return apiClient<TAllCampaignsResponse>("/fund-campaigns/admin/all");
};

export const reviewFundCampaign = ({
  id,
  payload,
}: {
  id: string;
  payload: TReviewCampaignPayload;
}) => {
  return apiClient(`/fund-campaigns/admin/review/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
};
