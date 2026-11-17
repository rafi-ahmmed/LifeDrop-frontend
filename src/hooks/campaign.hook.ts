import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createCampaign, getAllCampaigns, getMyCampaigns } from "@/api";
import {
  PATIENT_QUERY_KEYS,
  PUBLIC_KEYS,
} from "@/lib/tanstack-query/query-keys";

export const useCreateCampaign = () => {
  return useMutation({
    mutationFn: createCampaign,
  });
};

export const useGetCampaigns = () => {
  return useQuery({
    queryKey: [PATIENT_QUERY_KEYS.PATIENT_CAMPAIGNS],
    queryFn: getMyCampaigns,
  });
};

export const useGetCampaignsSuspense = () => {
  return useSuspenseQuery({
    queryKey: [PATIENT_QUERY_KEYS.PATIENT_CAMPAIGNS],
    queryFn: getMyCampaigns,
  });
};

// ? For campaign page
export const useGetAllCampaigns = () => {
  return useQuery({
    queryKey: [PUBLIC_KEYS.ALL_CAMPAIGNS],
    queryFn: getAllCampaigns,
  });
};

export const useGetAllCampaignsSuspense = () => {
  return useSuspenseQuery({
    queryKey: [PUBLIC_KEYS.ALL_CAMPAIGNS],
    queryFn: getAllCampaigns,
  });
};
