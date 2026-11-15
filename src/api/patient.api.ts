import apiClient from "@/lib/api-client";
import type { PatientStatsApiResponse } from "@/types";

export const getPatientStats = () => {
  return apiClient<PatientStatsApiResponse>("/patients/patient-stats");
};
