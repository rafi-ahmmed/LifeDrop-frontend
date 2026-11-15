import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  createBloodRequest,
  deleteBloodRequest,
  getMyBloodRequests,
  matchingDonor,
  sendDonorRequests,
} from "@/api";
import type { TDonorMatchingParams } from "@/types";

export const useCreateBloodRequest = () => {
  return useMutation({
    mutationFn: createBloodRequest,
  });
};

export const useGetMyBloodRequests = () => {
  return useQuery({
    queryKey: ["my-blood-requests"],
    queryFn: getMyBloodRequests,
  });
};

export const useGetMyBloodRequestsSuspense = () => {
  return useSuspenseQuery({
    queryKey: ["my-blood-requests"],
    queryFn: getMyBloodRequests,
  });
};

export const useMatchingDonor = (
  requestId: string,
  params: TDonorMatchingParams,
) => {
  return useQuery({
    queryKey: ["matched-donor"],
    queryFn: () => matchingDonor(requestId, params),
  });
};

export const useMatchingDonorSuspense = (
  requestId: string,
  params: TDonorMatchingParams,
) => {
  return useSuspenseQuery({
    queryKey: ["matched-donor", requestId, params],
    queryFn: () => matchingDonor(requestId, params),
  });
};

export const useDeleteBloodRequest = () => {
  return useMutation({
    mutationFn: deleteBloodRequest,
  });
};

export const useSendDonorRequests = () => {
  return useMutation({
    mutationFn: ({
      requestId,
      donorIds,
    }: {
      requestId: string;
      donorIds: string[];
    }) => sendDonorRequests(requestId, donorIds),
  });
};
