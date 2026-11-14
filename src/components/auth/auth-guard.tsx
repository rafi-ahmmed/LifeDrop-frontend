"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useGetMe } from "@/hooks";
import AuthLoading from "./auth-loading";
import { DashboardSkeleton } from "./dashboard-skeleton";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { data, isPending, isError } = useGetMe();
  const router = useRouter();
  console.log(data);

  useEffect(() => {
    if (isPending) return;
    if (isError || !data) {
      router.replace("/login");
    }
  }, [isPending, isError, data, router]);

  if (isPending) return <DashboardSkeleton />;

  if (isError || !data) {
    router.replace("/login");
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
