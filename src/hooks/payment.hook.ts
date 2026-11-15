import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getMyPayments } from "@/api/payment.api";

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
