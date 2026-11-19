export type PaymentStatus = "UNPAID" | "PAID" | "FAILED" | "CANCELLED";

export type PaymentMethod = "BKASH" | "SSLCOMMERZ" | "STRIPE";

export interface TPayment {
  id: string;
  amount: string;
  paymentId: string | null;
  cardType: string | null; //for ssl
  bankTranId: string | null; //For ssl
  trxID: string | null;
  paidAt: string;
  method: PaymentMethod;
  status: PaymentStatus;
  gatewayResponse?: JSON | null;
  campaignId: string;
  userId: string;
  campaign?: {
    id?: string;
    title: string;
    patientName: string;
  };
}

export interface PaymentApiResponse {
  success: boolean;
  message: string;
  meta?: Record<string, unknown>;
  data: TPayment[];
}

export interface CreatePaymentPayload {
  campaignId: string;
  amount: number;
}
