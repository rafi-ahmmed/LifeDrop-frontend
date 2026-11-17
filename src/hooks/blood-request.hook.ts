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
import {
  DONOR_QUERY_KEYS,
  PATIENT_QUERY_KEYS,
} from "@/lib/tanstack-query/query-keys";
import type { DonorRequestStatusAction, TDonorMatchingParams } from "@/types";

export const useCreateBloodRequest = () => {
  return useMutation({
    mutationFn: createBloodRequest,
  });
};

export const useGetMyBloodRequests = () => {
  return useQuery({
    queryKey: [PATIENT_QUERY_KEYS.PATIENT_BLOOD_REQ],
    queryFn: getMyBloodRequests,
  });
};

export const useGetMyBloodRequestsSuspense = () => {
  return useSuspenseQuery({
    queryKey: [PATIENT_QUERY_KEYS.PATIENT_BLOOD_REQ],
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
    queryKey: [PATIENT_QUERY_KEYS.PATIENT_DONOR_REQ],
    queryFn: getMyDonorRequests,
  });
};

export const useGetMyDonorRequestsSuspense = () => {
  return useSuspenseQuery({
    queryKey: [PATIENT_QUERY_KEYS.PATIENT_DONOR_REQ],
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
      queryClient.invalidateQueries({
        queryKey: [PATIENT_QUERY_KEYS.PATIENT_DONOR_REQ],
      });
      queryClient.invalidateQueries({
        queryKey: [PATIENT_QUERY_KEYS.PATIENT_BLOOD_REQ],
      });
      queryClient.invalidateQueries({
        queryKey: [PATIENT_QUERY_KEYS.PATIENT_STATS],
      });
      queryClient.invalidateQueries({
        queryKey: [DONOR_QUERY_KEYS.DONORs_DONOR_REQ],
      });
      queryClient.invalidateQueries({
        queryKey: [DONOR_QUERY_KEYS.DONOR_STATS],
      });
    },
  });
};
