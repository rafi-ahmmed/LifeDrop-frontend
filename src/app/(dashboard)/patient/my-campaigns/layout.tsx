import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "My Campaigns",
    template: "%s | LifeDrop",
  },
  description:
    "Track and manage all of your medical fundraising campaigns in one place.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
