import type { BloodRequestStatus } from "./blood-request.type";

export type DonorRequestStatus =
  | "PENDING"
  | "INTERESTED"
  | "DECLINED"
  | "ACCEPTED"
  | "CANCELLED"
  | "WITHDRAWN"
  | "COMPLETED";

export type DonorRequestStatusAction = "ACCEPTED" | "CANCELLED" | "COMPLETED";

export interface TDonorRequestDonor {
  id: string;
  address: string;
  district: string;
  availability: boolean;
  bloodGroup: string;
  phone?: string;
  gender?: string;
}

export interface TDonorRequest {
  id: string;
  status: DonorRequestStatus;
  donor: TDonorRequestDonor;
}

/** A blood request with its nested donor requests, as returned by the API. */
export interface TBloodRequestWithDonorRequests {
  id: string;
  bloodGroup: string;
  district: string;
  address: string;
  units: number;
  status: BloodRequestStatus;
  donorRequests: TDonorRequest[];
}

export interface TDonorRequestsApiResponse {
  success: boolean;
  message: string;
  data: TBloodRequestWithDonorRequests[];
}

export interface TUpdateDonorRequestPayload {
  status: DonorRequestStatusAction;
}
