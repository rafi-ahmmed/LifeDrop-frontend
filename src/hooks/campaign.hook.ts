import { useMutation } from "@tanstack/react-query";
import { createCampaign } from "@/api";

export const useCreateCampaign = () => {
  return useMutation({
    mutationFn: createCampaign,
  });
};
