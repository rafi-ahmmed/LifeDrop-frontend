import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getMyDonorRequestForDonor, respondToDonorRequest } from "@/api";
import { toast } from "@/components/ui/toast";
import {
  DONOR_QUERY_KEYS,
  PATIENT_QUERY_KEYS,
} from "@/lib/tanstack-query/query-keys";
import type { TRespondPayload } from "@/types";

export const useGetMyDonorRequestForDonorSuspense = () => {
  return useSuspenseQuery({
    queryKey: [DONOR_QUERY_KEYS.DONORs_DONOR_REQ],
    queryFn: getMyDonorRequestForDonor,
  });
};

export const useRespondToDonorRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: TRespondPayload }) =>
      respondToDonorRequest({ id, payload }),
    onSuccess: (data: any) => {
      toast.add({
        title: "Status Updated",
        description: data?.message || "Response updated successfully",
        type: "success",
      });

      queryClient.invalidateQueries({
        queryKey: [DONOR_QUERY_KEYS.DONORs_DONOR_REQ],
      });
      queryClient.invalidateQueries({
        queryKey: [PATIENT_QUERY_KEYS.PATIENT_DONOR_REQ],
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.data?.message || error?.message || "Something went wrong";

      toast.add({
        title: "Action Failed",
        description: errorMessage,
        type: "error",
      });
    },
  });
};
