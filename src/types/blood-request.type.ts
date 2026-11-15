export type BloodRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "FULFILLED"
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
