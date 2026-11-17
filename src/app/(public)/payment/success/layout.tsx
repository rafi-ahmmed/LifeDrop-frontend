import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Payment Successful",
    template: "%s | LifeDrop",
  },
  description:
    "Your LifeDrop campaign donation was processed successfully. Thank you for supporting a patient in need.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
