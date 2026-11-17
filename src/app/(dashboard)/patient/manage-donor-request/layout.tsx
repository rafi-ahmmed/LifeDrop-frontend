import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Donor Requests",
    template: "%s | LifeDrop",
  },
  description:
    "Manage responses from donors who volunteered to help with your blood request.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
