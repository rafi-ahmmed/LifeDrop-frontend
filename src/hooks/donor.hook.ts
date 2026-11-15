import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { getDonorStats, updateDonorAvailability } from "@/api/donor.api";
import { toast } from "@/components/ui/toast";

export const useGetDonorStatsSuspense = () => {
  return useSuspenseQuery({
    queryKey: ["donor-stats"],
    queryFn: getDonorStats,
  });
};

export const useUpdateDonorAvailability = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateDonorAvailability,
    onSuccess: (data: any) => {
      toast.add({
        title: "Availability Updated",
        description:
          data?.message || "Your donor availability status has been updated",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["donor-stats"] });
    },
    onError: (error: any) => {
      toast.add({
        title: "Update Failed",
        description: error?.message || "Failed to update availability status",
        type: "error",
      });
    },
  });
};
