import { HeartHandshake } from "lucide-react";
import { Suspense } from "react";
import { DonorRequestsSkeletonDonor } from "@/components/modules/donor/my-blood-request/donor-requests-skeleton-donor";
import { DonorRequestsTable } from "@/components/modules/donor/my-blood-request/donor-requests-table";

export default function MyBloodRequestsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">
      {/* পেজ হেডার */}
      <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-rose-500 to-primary" />

        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <HeartHandshake className="w-3.5 h-3.5" />
            Donation Requests
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Incoming Blood Requests
          </h1>
          <p className="text-xs text-muted-foreground">
            Review patient details and respond to urgent blood donation requests
            matched with your profile.
          </p>
        </div>
      </div>

      {/* Suspense বাউন্ডারির ভেতরে টেবিল */}
      <Suspense fallback={<DonorRequestsSkeletonDonor />}>
        <DonorRequestsTable />
      </Suspense>
    </div>
  );
}
