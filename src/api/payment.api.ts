import apiClient from "@/lib/api-client";

export const getMyPayments = () => {
  return apiClient("/payments/my-payments");
};
