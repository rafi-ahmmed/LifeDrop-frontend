import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Payment History",
    template: "%s | LifeDrop",
  },
  description:
    "Review the donations and transactions made toward your LifeDrop campaigns.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
