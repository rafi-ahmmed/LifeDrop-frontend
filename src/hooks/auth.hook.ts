import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, logOut, userLogin } from "@/api";

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
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
