import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createPaymentByBkash, getMyPayments } from "@/api/payment.api";
import { PATIENT_QUERY_KEYS } from "@/lib/tanstack-query/query-keys";

export const useCreatePaymentByBkash = () => {
  return useMutation({
    mutationFn: createPaymentByBkash,
  });
};

export const useGetMyPayments = () => {
  return useQuery({
    queryKey: [PATIENT_QUERY_KEYS.PATIENT_PAYMENTS],
    queryFn: getMyPayments,
  });
};

export const useGetMyPaymentsSuspense = () => {
  return useSuspenseQuery({
    queryKey: [PATIENT_QUERY_KEYS.PATIENT_PAYMENTS],
    queryFn: getMyPayments,
  });
};
