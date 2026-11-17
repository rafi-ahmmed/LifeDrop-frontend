import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getPatientStats } from "@/api/patient.api";
import { PATIENT_QUERY_KEYS } from "@/lib/tanstack-query/query-keys";

export const useGetPatientStats = () => {
  return useQuery({
    queryKey: [PATIENT_QUERY_KEYS.PATIENT_STATS],
    queryFn: getPatientStats,
  });
};

export const useGetPatientStatsSuspense = () => {
  return useSuspenseQuery({
    queryKey: [PATIENT_QUERY_KEYS.PATIENT_STATS],
    queryFn: getPatientStats,
  });
};
