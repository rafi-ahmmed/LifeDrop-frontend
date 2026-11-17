import type { Metadata } from "next";

import NotFoundContent from "@/components/shared/not-found-content";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for could not be found on LifeDrop.",
};

export default function NotFound() {
  return <NotFoundContent />;
}
