import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createCampaign, getAllCampaigns, getMyCampaigns } from "@/api";

export const useCreateCampaign = () => {
  return useMutation({
    mutationFn: createCampaign,
  });
};

export const useGetCampaigns = () => {
  return useQuery({
    queryKey: ["my-campaigns"],
    queryFn: getMyCampaigns,
  });
};

export const useGetCampaignsSuspense = () => {
  return useSuspenseQuery({
    queryKey: ["my-campaigns"],
    queryFn: getMyCampaigns,
  });
};

export const useGetAllCampaigns = () => {
  return useQuery({
    queryKey: ["all-campaigns"],
    queryFn: getAllCampaigns,
  });
};

export const useGetAllCampaignsSuspense = () => {
  return useSuspenseQuery({
    queryKey: ["all-campaigns"],
    queryFn: getAllCampaigns,
  });
};
