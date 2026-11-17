import type { Metadata } from "next";
import { Suspense } from "react";
import { DonorOverview } from "@/components/modules/donor/overview/donor-overview";
import { DonorOverviewSkeleton } from "@/components/modules/donor/overview/donor-overview-skeleton";

export const metadata: Metadata = {
  title: "Donor Dashboard",
  description:
    "Your donor dashboard: upcoming donation requests, activity and impact at a glance.",
};

export default function Page() {
  return (
    <Suspense fallback={<DonorOverviewSkeleton />}>
      <DonorOverview />
    </Suspense>
  );
}
