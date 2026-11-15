import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getPatientStats } from "@/api/patient.api";

export const useGetPatientStats = () => {
  return useQuery({
    queryKey: ["patient-stats"],
    queryFn: getPatientStats,
  });
};

export const useGetPatientStatsSuspense = () => {
  return useSuspenseQuery({
    queryKey: ["patient-stats"],
    queryFn: getPatientStats,
  });
};
