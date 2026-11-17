import { Suspense } from "react";
import { DonorOverview } from "@/components/modules/donor/overview/donor-overview";
import { DonorOverviewSkeleton } from "@/components/modules/donor/overview/donor-overview-skeleton";

export default function Page() {
  return (
    <Suspense fallback={<DonorOverviewSkeleton />}>
      <DonorOverview />
    </Suspense>
  );
}
