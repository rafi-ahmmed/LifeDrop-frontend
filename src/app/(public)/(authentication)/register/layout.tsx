import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Create Account",
    template: "%s | LifeDrop",
  },
  description:
    "Register as a donor, patient or hospital and join the LifeDrop blood donation network.",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
