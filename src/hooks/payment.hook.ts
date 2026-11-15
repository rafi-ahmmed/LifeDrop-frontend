import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createPaymentByBkash, getMyPayments } from "@/api/payment.api";

export const useCreatePaymentByBkash = () => {
  return useMutation({
    mutationFn: createPaymentByBkash,
  });
};

export const useGetMyPayments = () => {
  return useQuery({
    queryKey: ["my-payments"],
    queryFn: getMyPayments,
  });
};

export const useGetMyPaymentsSuspense = () => {
  return useSuspenseQuery({
    queryKey: ["my-payments"],
    queryFn: getMyPayments,
  });
};
