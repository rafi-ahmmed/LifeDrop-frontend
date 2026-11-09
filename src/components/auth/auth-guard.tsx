"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useGetMe } from "@/hooks";
import AuthLoading from "./auth-loading";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { data, isPending, isError } = useGetMe();
  const router = useRouter();
  console.log(data);

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

  return <>{children}</>;
};

export default AuthGuard;
