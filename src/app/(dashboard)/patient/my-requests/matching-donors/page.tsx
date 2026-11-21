"use client";
import { ArrowLeft, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { DonorFilterSwitches } from "@/components/modules/patient/matching-donors/donor-filter-switches";
import { MatchingDonorList } from "@/components/modules/patient/matching-donors/matching-donor-list";
import { MatchingDonorsSkeleton } from "@/components/modules/patient/matching-donors/matching-donors-skeleton";
import { Button } from "@/components/ui/button";
import type { TDonorMatchingParams } from "@/types";

export default function MatchingDonorsPage() {
  const searchParams = useSearchParams();
  const exactDistrict = searchParams.get("exactDistrict");
  const exactLocation = searchParams.get("exactLocation");
  const requestId = searchParams.get("requestId");


  const filterParams: TDonorMatchingParams = {
    exactDistrict: exactDistrict === "true",
    exactLocation: exactLocation === "true",
  };

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <Button
          nativeButton={false}
          render={<Link href="/patient/my-requests" />}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground w-fit px-0 bg-transparent shadow-none hover:bg-transparent"
        >
          <ArrowLeft size={16} />
          Back to My Requests
        </Button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Users size={20} className="text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Matching Donors
          </h1>
        </div>
        <p className="text-sm text-muted-foreground pl-1">
          Request ID:{" "}
          <span className="font-mono text-xs text-foreground/60">
            {requestId}
          </span>
        </p>
      </div>

      {/* Filter Switches */}
      <DonorFilterSwitches />

      {/* Donor List with Suspense */}
      <Suspense fallback={<MatchingDonorsSkeleton />}>
        <MatchingDonorList
          requestId={requestId as string}
          params={filterParams}
        />
      </Suspense>
    </div>
  );
}
