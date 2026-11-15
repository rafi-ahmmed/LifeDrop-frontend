import apiClient from "@/lib/api-client";
import type { CreatePaymentPayload } from "@/types";

export const getMyPayments = () => {
  return apiClient("/payments/my-payments");
};

export const createPaymentByBkash = (payload: CreatePaymentPayload) => {
  return apiClient("/payments/create-payment", {
    method: "POST",
    body: payload,
  });
};
