import apiClient from "@/lib/api-client";
import type { TDonorStatsResponse } from "@/types";

export const getDonorStats = () => {
  return apiClient<TDonorStatsResponse>("/donors/donor-stats");
};

export const updateDonorAvailability = (availability: boolean) => {
  return apiClient("/donors/availability", {
    method: "PATCH",
    body: JSON.stringify({ availability }),
  });
};