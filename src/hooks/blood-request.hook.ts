import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  createBloodRequest,
  deleteBloodRequest,
  getMyBloodRequests,
} from "@/api";

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

export const useDeleteBloodRequest = () => {
  return useMutation({
    mutationFn: deleteBloodRequest,
  });
};
