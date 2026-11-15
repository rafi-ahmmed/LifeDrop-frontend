"use client";

import { HandHeart } from "lucide-react";
import { Suspense } from "react";
import DonorRequestList from "@/components/modules/patient/donor-requests/donor-request-list";
import { DonorRequestsSkeleton } from "@/components/modules/patient/donor-requests/donor-requests-skeleton";

export default function ManageDonorRequestPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-2 sm:p-4 md:p-6 max-w-7xl mx-auto w-full relative">
      {/* Decorative ambient light */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-rose-500/10 text-rose-500 shadow-inner shrink-0">
            <HandHeart className="w-5 h-5" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              Manage Donor Requests
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Review donor responses to your blood requests and accept,
              complete, or cancel them.
            </p>
          </div>
        </div>
      </div>

      {/* Content with Suspense */}
      <Suspense fallback={<DonorRequestsSkeleton />}>
        <DonorRequestList />
      </Suspense>
    </div>
  );
}
