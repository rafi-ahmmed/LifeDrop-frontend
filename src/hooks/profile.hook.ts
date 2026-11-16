import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateDonorProfile,
  updatePatientProfile,
  uploadProfileImage,
} from "@/api";
import { toast } from "@/components/ui/toast";
import type { TUpdateProfilePayload } from "@/types";

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => uploadProfileImage(formData),
    onSuccess: (data: any) => {
      toast.add({
        title: "Photo Updated",
        description: data?.message || "Profile picture updated successfully",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      toast.add({
        title: "Upload Failed",
        description:
          error?.data?.message || error?.message || "Failed to upload image",
        type: "error",
      });
    },
  });
};

export const useUpdatePatientProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TUpdateProfilePayload) =>
      updatePatientProfile(payload),
    onSuccess: (data: any) => {
      toast.add({
        title: "Profile Updated",
        description: data?.message || "Patient details updated successfully",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      toast.add({
        title: "Update Failed",
        description:
          error?.data?.message || error?.message || "Failed to update profile",
        type: "error",
      });
    },
  });
};

export const useUpdateDonorProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: TUpdateProfilePayload) => updateDonorProfile(payload),
    onSuccess: (data: any) => {
      toast.add({
        title: "Profile Updated",
        description: data?.message || "Donor details updated successfully",
        type: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error: any) => {
      toast.add({
        title: "Update Failed",
        description:
          error?.data?.message || error?.message || "Failed to update profile",
        type: "error",
      });
    },
  });
};
