import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "My Blood Requests",
    template: "%s | LifeDrop",
  },
  description:
    "View and track all blood requests you have created on LifeDrop.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
