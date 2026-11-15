"use client";

import { Droplet, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { MyRequestList } from "@/components/modules/patient/my-requests/my-request-list";
import { MyRequestSkeleton } from "@/components/modules/patient/my-requests/my-request-skeleton";
import { Button } from "@/components/ui/button";

export default function MyBloodRequestsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-2 sm:p-4 md:p-6 max-w-7xl mx-auto w-full relative">
      {/* Decorative ambient light */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-rose-500/10 text-rose-500 shadow-inner shrink-0">
            <Droplet className="w-5 h-5 fill-rose-500 animate-pulse" />
          </div>

          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
              My Blood Requests
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage, monitor, and track all your emergency blood donation
              requests in one place.
            </p>
          </div>
        </div>

        <Button
          nativeButton={false}
          render={<Link href="/patient/create-blood-request" />}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Blood Request</span>
        </Button>
      </div>

      {/* Content with Suspense */}
      <Suspense fallback={<MyRequestSkeleton />}>
        <MyRequestList />
      </Suspense>
    </div>
  );
}
