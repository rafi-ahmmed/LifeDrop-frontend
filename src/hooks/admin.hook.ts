import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getAdminStats,
  getAllBloodRequests,
  getAllUsers,
  updateBloodRequestStatus,
  updateUserStatus,
} from "@/api";
import { toast } from "@/components/ui/toast";
import type { TUpdateStatusPayload, TUpdateUserStatusPayload } from "@/types";

export const useGetAdminStatsSuspense = () => {
  return useSuspenseQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
  });
};

export const useGetBloodRequestsSuspense = (queryString: string) => {
  return useSuspenseQuery({
    queryKey: ["blood-requests", queryString],
    queryFn: () => getAllBloodRequests(queryString),
  });
};

export const useUpdateBloodRequestStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: TUpdateStatusPayload;
    }) => updateBloodRequestStatus({ id, payload }),

    onSuccess: (data: any) => {
      toast.add({
        title: "Status Updated",
        description:
          data?.message || "Blood request status updated successfully",
        type: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["my-blood-requests"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
    },

    onError: (error: any) => {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to update request status";

      toast.add({
        title: "Action Failed",
        description: errorMessage,
        type: "error",
      });
    },
  });
};

export const useGetAllUsersSuspense = () => {
  return useSuspenseQuery({
    queryKey: ["admin-users"],
    queryFn: getAllUsers,
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: TUpdateUserStatusPayload;
    }) => updateUserStatus({ id, payload }),

    onSuccess: (data: any) => {
      toast.add({
        title: "User Status Updated",
        description: data?.message || "User status updated successfully",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (error: any) => {
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to update user status";

      toast.add({
        title: "Action Failed",
        description: errorMessage,
        type: "error",
      });
    },
  });
};
