export type BloodRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "MATCHING"
  | "FULFILLED"
  | "EXPIRED"
  | "ACTIVE"
  | "CANCELLED";

export type TBloodRequest = {
  id: string;
  requestorId: string;
  patientName: string;
  bloodGroup: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  reason: string;
  phone: string;
  units: number;
  address: string;
  district: string;
  neededAt: string;
  urgency: boolean;
  status: BloodRequestStatus;
  description?: string;
  reviewerId?: string | null;
  createdAt: string;
  updatedAt: string;
};

export interface TDonorMatchingParams {
  exactLocation?: boolean;
  exactDistrict?: boolean;
}

export type TMatchingDonor = {
  id: string;
  bloodGroup: string;
  district: string;
  address: string;
};

export type TMatchingDonorsResponse = {
  matchingDonors: TMatchingDonor[];
  unsentDonorIds: string[];
};
