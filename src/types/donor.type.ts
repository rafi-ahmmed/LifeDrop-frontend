export interface TDonorStatistics {
  totalDonations: number;
  completedRequests: number;
  pendingResponses: number;
  acceptedResponses: number;
}

export interface TDonorEligibility {
  isEligible: boolean;
  lastDonatedAt: string | null;
  nextEligibleDate: string | null;
  remainingDays: number;
}

export interface TDonorStatsData {
  statistics: TDonorStatistics;
  eligibility: TDonorEligibility;
  availability: boolean;
}

export interface TDonorStatsResponse {
  success: boolean;
  message: string;
  data: TDonorStatsData;
}
