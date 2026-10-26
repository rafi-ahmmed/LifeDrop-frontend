import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DonorRegister,
  getMe,
  logOut,
  patientRegister,
  userLogin,
} from "@/api";

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

export const useLogout = () => {
  return useMutation({
    mutationFn: logOut,
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMe,
    retry: false,
  });
};
