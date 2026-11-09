import React, { type ReactNode } from "react";
import AuthGuard from "@/components/auth/auth-guard";

const layout = ({ children }: { children: ReactNode }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default layout;
