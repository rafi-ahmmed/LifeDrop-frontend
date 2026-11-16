import type { TBloodRequest } from "./blood-request.type";
import type { TFundCampaign } from "./campaign.type";
import type { TUserItem, UserStatus } from "./user.types";

export interface TAdminUsersStats {
  totalPatients: number;
  totalDonors: number;
  activeUsers: number;
  blockedUsers: number;
}

export interface TAdminBloodRequestsStats {
  total: number;
  pending: number;
  approved: number;
  fulfilled: number;
}

export interface TAdminFundCampaignsStats {
  total: number;
  pending: number;
  approved: number;
}

export interface TMonthlyFundingItem {
  createdAt: string;
  targetAmount: string;
  collectedAmount: string;
}

export interface TDailyBloodRequestItem {
  createdAt: string;
}

export interface TAdminStatsData {
  users: TAdminUsersStats;
  bloodRequests: TAdminBloodRequestsStats;
  fundCampaigns: TAdminFundCampaignsStats;
  totalFundingRevenue: string;
  monthlyFundingData: TMonthlyFundingItem[];
  dailyBloodRequestsData: TDailyBloodRequestItem[];
}

export interface TAdminStatsResponse {
  success: boolean;
  message: string;
  data: TAdminStatsData;
}

export interface TMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface TAllBloodRequestsResponse {
  success: boolean;
  message: string;
  data: {
    meta: TMeta;
    data: TBloodRequest[];
  };
}

export interface TUpdateStatusPayload {
  status: "APPROVED" | "REJECTED";
}

export interface TAllUsersResponse {
  success: boolean;
  message: string;
  data: TUserItem[];
}

export interface TUpdateUserStatusPayload {
  status: UserStatus;
}

export interface TAllCampaignsResponse {
  success: boolean;
  message: string;
  data: TFundCampaign[];
}

export interface TReviewCampaignPayload {
  status: "APPROVED" | "REJECTED";
  rejectedReason?: string;
}
