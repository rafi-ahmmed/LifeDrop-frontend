import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Payment Failed",
    template: "%s | LifeDrop",
  },
  description:
    "Your LifeDrop payment could not be completed. Review the details and try again.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
