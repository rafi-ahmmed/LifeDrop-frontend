import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import {
  DonorRegister,
  getMe,
  logOut,
  patientRegister,
  userLogin,
  verifyEmail,
} from "@/api";
import { AUTH_KEYS } from "@/lib/tanstack-query/query-keys";

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};

export const useRegisterPatient = () => {
  return useMutation({
    mutationFn: patientRegister,
  });
};

export const useRegisterDonor = () => {
  return useMutation({
    mutationFn: DonorRegister,
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmail,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logOut,
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: [AUTH_KEYS.CURRENT_USER],
    queryFn: getMe,
    retry: false,
  });
};

export const useGetMeSuspense = () => {
  return useSuspenseQuery({
    queryKey: [AUTH_KEYS.CURRENT_USER],
    queryFn: getMe,
    retry: false,
  });
};

export const useUserAccessGuard = () => {
  const { data: response, isPending } = useGetMe();
  const user = response?.data;

  const isBlocked = user?.status === "BLOCKED";
  const isUnverified = !user?.isVerified;

  return {
    user,
    isPending,
    isRestricted: isBlocked || isUnverified,
    restrictionReason: isBlocked
      ? "Your account has been blocked by the administrator."
      : "Your account is unverified.",
  };
};
