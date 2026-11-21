"use client";

import { useRouter } from "next/navigation";
import { type ReactNode, useEffect } from "react";
import { useGetMe } from "@/hooks";
import { AuthPageSkeleton } from "../loading/page-skeletons";

export default function GuestGuard({ children }: { children: ReactNode }) {
  const router = useRouter();

  const { data, isLoading, isError } = useGetMe();
  console.log("login data from guest guard", data);

  useEffect(() => {
    if (data?.success && data.data) {
      router.replace("/");
    }
  }, [data, router]);

  if (isLoading) {
    return <AuthPageSkeleton />;
  }

  if (data?.success && data.data) {
    return null;
  }

  return <>{children}</>;
}
