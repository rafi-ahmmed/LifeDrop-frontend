"use client"
import React, { type ReactNode } from "react";
import AuthGuard from "@/components/auth/auth-guard";
import { useUserAccessGuard } from "@/hooks";
import { AccountRestrictedModal } from "@/components/dashboard/account-restricted-modal";
import { DashboardSkeleton } from "@/components/auth/dashboard-skeleton";

const layout = ({ children }: { children: ReactNode }) => {
  const {isRestricted,restrictionReason,isPending} = useUserAccessGuard()

  if(isPending){
    return <DashboardSkeleton/>
  }

  if(isRestricted){
    return  <AccountRestrictedModal open={isRestricted} reason={restrictionReason} />
  }

  
  return <AuthGuard>{children}</AuthGuard>;
      
     

};

export default layout;
