export type FundCampaignStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED"
  | "EXPIRED";

export type TFundCampaign = {
  id: string;
  userId: string;
  patientName: string;
  hospitalName: string | null;
  contactNumber: string;
  title: string;
  description: string;
  status: FundCampaignStatus;
  targetAmount: string;
  collectedAmount: string;
  deadline: string;
  medicalDocuments: {
    fileUrl: string;
    publicId: string;
  }[];
  reviewedBy: string | null;
  reviewedAt: string | null;
  rejectedReason: string | null;
  createdAt: string;
  updatedAt: string;
};
