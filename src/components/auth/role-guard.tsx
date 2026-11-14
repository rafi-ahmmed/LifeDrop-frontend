"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useGetMe } from "@/hooks";
import type { UserRole } from "@/types";
import AccessDenied from "./access-denied";
import AuthLoading from "./auth-loading";
import { DashboardSkeleton } from "./dashboard-skeleton";
import { ForbiddenAccess } from "./forbidden-access";

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
  }, [isPending, isError, data, router]);

  if (isPending) return <DashboardSkeleton />;

  if (isError || !data) {
    return <AccessDenied />;
  }

  if (!isAuthorized) {
    return <ForbiddenAccess />;
  }

  return <>{children}</>;
};

export default RoleGuard;
