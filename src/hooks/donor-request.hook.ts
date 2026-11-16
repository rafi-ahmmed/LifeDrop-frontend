import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { FetchError } from "ofetch";
import { getMyDonorRequestForDonor, respondToDonorRequest } from "@/api";
import { toast } from "@/components/ui/toast";
import type { TRespondPayload } from "@/types";

export const useGetMyDonorRequestForDonorSuspense = () => {
  return useSuspenseQuery({
    queryKey: ["donor's-donor-requests"],
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

      queryClient.invalidateQueries({ queryKey: ["donor's-donor-requests"] });
      queryClient.invalidateQueries({ queryKey: ["my-donor-requests"] });
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
