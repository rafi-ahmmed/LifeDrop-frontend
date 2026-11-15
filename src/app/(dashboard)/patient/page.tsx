import { Suspense } from "react";
import { PatientOverview } from "@/components/modules/patient/overview/patient-overview";
import { PatientOverviewSkeleton } from "@/components/modules/patient/overview/patient-overview-skeleton";

export default function PatientPage() {
  return (
    <Suspense fallback={<PatientOverviewSkeleton />}>
      <PatientOverview />
    </Suspense>
  );
}
