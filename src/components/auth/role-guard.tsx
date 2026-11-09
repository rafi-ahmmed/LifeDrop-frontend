"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useGetMe } from "@/hooks";
import type { UserRole } from "@/types";
import AccessDenied from "./access-denied";
import AuthLoading from "./auth-loading";

interface IProps {
  children: ReactNode;
  role: UserRole[];
}

const RoleGuard = ({ children, role }: IProps) => {
  const { data, isPending, isError } = useGetMe();
  const router = useRouter();
  console.log(data);

  const user = data?.data;

  const isAuthorized = !!user && role.includes(user.role);

  useEffect(() => {
    if (isPending) return;
    if (isError || !data) {
      router.replace("/login");
    }
  });

  if (isPending) return <AuthLoading />;

  if (isError || !data) {
    // TODO: a loading state is already handled above, so we can return null here
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  return <AccessDenied />;
};

export default RoleGuard;
