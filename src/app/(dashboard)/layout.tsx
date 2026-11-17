"use client";
import type { ReactNode } from "react";
import AuthGuard from "@/components/auth/auth-guard";
import { DashboardSkeleton } from "@/components/auth/dashboard-skeleton";
import { AccountRestrictedModal } from "@/components/dashboard/account-restricted-modal";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { useUserAccessGuard } from "@/hooks";

const layout = ({ children }: { children: ReactNode }) => {
  const { user, isRestricted, restrictionReason, isPending } =
    useUserAccessGuard();

  if (isPending || !user) {
    return <DashboardSkeleton />;
  }

  if (isRestricted) {
    return (
      <AccountRestrictedModal open={isRestricted} reason={restrictionReason} />
    );
  }

  return (
    <AuthGuard>
      <DashboardShell role={user.role}>{children}</DashboardShell>
    </AuthGuard>
  );
};

export default layout;
