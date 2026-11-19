import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  getAdminStats,
  getAllAdminCampaigns,
  getAllBloodRequests,
  getAllUsers,
  reviewFundCampaign,
  updateBloodRequestStatus,
  updateUserStatus,
} from "@/api";
import { toast } from "@/components/ui/toast";
import {
  ADMIN_QUERY_KEYS,
  AUTH_KEYS,
  PATIENT_QUERY_KEYS,
  PUBLIC_KEYS,
} from "@/lib/tanstack-query/query-keys";
import type {
  TReviewCampaignPayload,
  TUpdateStatusPayload,
  TUpdateUserStatusPayload,
} from "@/types";

export const useGetAdminStatsSuspense = () => {
  return useSuspenseQuery({
    queryKey: [ADMIN_QUERY_KEYS.ADMIN_STATS],
    queryFn: getAdminStats,
  });
};

export const useGetBloodRequestsSuspense = (queryString: string) => {
  return useSuspenseQuery({
    queryKey: [ADMIN_QUERY_KEYS.ADMIN_BLOOD_REQs, queryString],
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

    onSuccess: (data) => {
      toast.add({
        title: "Status Updated",
        description:
          data?.message || "Blood request status updated successfully",
        type: "success",
      });

      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.ADMIN_BLOOD_REQs],
      });
      queryClient.invalidateQueries({
        queryKey: [PATIENT_QUERY_KEYS.PATIENT_BLOOD_REQ],
      });
      queryClient.invalidateQueries({
        queryKey: [PATIENT_QUERY_KEYS.PATIENT_STATS],
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.ADMIN_STATS],
      });
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
    queryKey: [ADMIN_QUERY_KEYS.ADMIN_ALL_USERS],
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
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.ADMIN_ALL_USERS],
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.ADMIN_STATS],
      });
      queryClient.invalidateQueries({ queryKey: [AUTH_KEYS.CURRENT_USER] });
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

export const useGetAllAdminCampaignsSuspense = () => {
  return useSuspenseQuery({
    queryKey: [ADMIN_QUERY_KEYS.ADMIN_ALL_CAMPAIGNS],
    queryFn: getAllAdminCampaigns,
  });
};

export const useReviewFundCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: TReviewCampaignPayload;
    }) => reviewFundCampaign({ id, payload }),

    onSuccess: (data: any) => {
      toast.add({
        title: "Campaign Reviewed",
        description: data?.message || "Campaign status updated successfully",
        type: "success",
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.ADMIN_ALL_CAMPAIGNS],
      });
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEYS.ADMIN_STATS],
      });
      queryClient.invalidateQueries({
        queryKey: [PATIENT_QUERY_KEYS.PATIENT_CAMPAIGNS],
      });
      queryClient.invalidateQueries({ queryKey: [PUBLIC_KEYS.ALL_CAMPAIGNS] });
    },

    onError: (error: any) => {
      const errorMessage =
        error?.data?.message || error?.message || "Failed to review campaign";

      toast.add({
        title: "Action Failed",
        description: errorMessage,
        type: "error",
      });
    },
  });
};
