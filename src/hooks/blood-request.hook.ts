import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  createBloodRequest,
  deleteBloodRequest,
  getMyBloodRequests,
  getMyDonorRequests,
  matchingDonor,
  sendDonorRequests,
  updateDonorRequestStatus,
} from "@/api";
import type { DonorRequestStatusAction, TDonorMatchingParams } from "@/types";

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

export const useGetMyDonorRequests = () => {
  return useQuery({
    queryKey: ["my-donor-requests"],
    queryFn: getMyDonorRequests,
  });
};

export const useGetMyDonorRequestsSuspense = () => {
  return useSuspenseQuery({
    queryKey: ["my-donor-requests"],
    queryFn: getMyDonorRequests,
  });
};

export const useUpdateDonorRequestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      donorRequestId,
      status,
    }: {
      donorRequestId: string;
      status: DonorRequestStatusAction;
    }) => updateDonorRequestStatus(donorRequestId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-donor-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-blood-requests"] });
      queryClient.invalidateQueries({ queryKey: ["patient-stats"] });
      queryClient.invalidateQueries({ queryKey: ["donor-stats"] });
    },
  });
};
