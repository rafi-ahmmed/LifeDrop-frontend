export interface TPatientStats {
  totalBloodRequests: number;
  activeBloodRequests: number;
  fulfilledBloodRequests: number;
  totalFundCampaigns: number;
}

export interface PatientStatsApiResponse {
  success: boolean;
  message: string;
  data: TPatientStats;
}
