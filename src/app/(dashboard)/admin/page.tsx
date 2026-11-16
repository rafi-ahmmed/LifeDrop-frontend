import { ShieldAlert } from "lucide-react";
import { Suspense } from "react";
import { AdminOverview } from "@/components/modules/admin/overview/admin-overview";
import { AdminOverviewSkeleton } from "@/components/modules/admin/overview/admin-overview-skeleton";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 md:p-8">
      <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-rose-500 to-primary" />

        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            Admin Control Center
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
            Platform Overview & Analytics
          </h1>
          <p className="text-xs text-muted-foreground">
            Real-time insights across registered donors, patients, blood
            requests, and fundraising campaigns.
          </p>
        </div>
      </div>

      <Suspense fallback={<AdminOverviewSkeleton />}>
        <AdminOverview />
      </Suspense>
    </div>
  );
}
