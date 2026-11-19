import apiClient from "@/lib/api-client";
import type { CreatePaymentPayload } from "@/types";

export const getMyPayments = () => {
  return apiClient("/payments/my-payments");
};

export const createPaymentByBkash = (payload: CreatePaymentPayload) => {
  return apiClient("/payments/create-bkash-payment", {
    method: "POST",
    body: payload,
  });
};

export const createPaymentBySSLCommerz = (payload: CreatePaymentPayload) => {
  return apiClient("/payments/create-ssl-payment", {
    method: "POST",
    body: payload,
  });
};
