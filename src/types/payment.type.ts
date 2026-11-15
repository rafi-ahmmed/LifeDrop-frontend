export type PaymentStatus = "UNPAID" | "PAID" | "FAILED" | "CANCELLED";

export type PaymentMethod = "BKASH" | "SSLCOMMERZ" | "STRIPE";

export interface GatewayResponse {
  trxId?: string | null;
  amount?: string;
  intent?: string;
  currency?: string;
  payerType?: string;
  paymentId?: string;
  payerAccount?: string;
  payerReference?: string;
  transactionStatus?: string;
  paymentExecuteTime?: string;
  maxRefundableAmount?: string;
  merchantInvoiceNumber?: string;
  externalCode?: string;
  internalCode?: string;
  errorMessageBn?: string | null;
  errorMessageEn?: string | null;
  [key: string]: unknown;
}

export interface TPayment {
  id: string;
  amount: string;
  bkashPaymentId: string | null;
  trxID: string | null;
  paidAt: string;
  method: PaymentMethod;
  status: PaymentStatus;
  gatewayResponse?: GatewayResponse | null;
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
