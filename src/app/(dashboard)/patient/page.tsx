import type { Metadata } from "next";
import { Suspense } from "react";
import { PatientOverview } from "@/components/modules/patient/overview/patient-overview";
import { PatientOverviewSkeleton } from "@/components/modules/patient/overview/patient-overview-skeleton";

export const metadata: Metadata = {
  title: "Patient Dashboard",
  description:
    "Track your blood requests, campaigns and donations from your LifeDrop patient dashboard.",
};

export default function PatientPage() {
  return (
    <Suspense fallback={<PatientOverviewSkeleton />}>
      <PatientOverview />
    </Suspense>
  );
}
