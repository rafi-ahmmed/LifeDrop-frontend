import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="flex min-h-svh w-full bg-background relative overflow-hidden">
      {/* Sidebar Skeleton */}
      <div className="hidden border-r bg-sidebar md:flex md:w-[18.8rem] flex-col shrink-0 justify-between">
        <div>
          {/* Logo Header */}
          <div className="flex h-14 items-center px-4 border-b">
            <Skeleton className="h-6 w-28 rounded-md" />
          </div>

          {/* Menu Groups */}
          <div className="flex-1 p-4 space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-20 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-9 w-full rounded-lg" />
                <Skeleton className="h-9 w-full rounded-lg" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-24 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-9 w-full rounded-lg" />
                <Skeleton className="h-9 w-full rounded-lg" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-20 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-9 w-full rounded-lg" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t bg-muted/20">
          <div className="flex items-center gap-3 p-2.5 rounded-xl border border-border/50">
            <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
            <div className="space-y-1.5 flex-1 overflow-hidden">
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-2 w-28 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Sticky Header */}
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center justify-between border-b bg-background px-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-4 w-32 rounded md:hidden" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </header>

        {/* Page Content — mirrors PatientOverview layout */}
        <main className="flex-1 p-2 sm:p-4 md:p-6">
          <div className="w-full max-w-7xl mx-auto space-y-8">
            {/* 1. Welcome Banner Skeleton */}
            <div className="bg-card border rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl flex-1">
                {/* Badge */}
                <Skeleton className="h-6 w-44 rounded-full" />
                {/* Heading */}
                <Skeleton className="h-9 w-72 rounded-lg" />
                <Skeleton className="h-6 w-56 rounded-lg" />
                {/* Description */}
                <div className="space-y-1.5 pt-1">
                  <Skeleton className="h-3.5 w-full rounded" />
                  <Skeleton className="h-3.5 w-4/5 rounded" />
                </div>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Skeleton className="h-11 w-40 rounded-xl" />
                <Skeleton className="h-11 w-36 rounded-xl" />
              </div>
            </div>

            {/* 2. Stats Cards — 4 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="p-5 sm:p-6 rounded-3xl bg-card border border-border/80 shadow-xs space-y-4 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-24 rounded" />
                    <Skeleton className="w-11 h-11 rounded-2xl" />
                  </div>
                  <div className="space-y-1.5">
                    <Skeleton className="h-10 w-16 rounded-lg" />
                    <Skeleton className="h-3 w-36 rounded" />
                  </div>
                  <div className="pt-1 border-t border-border/60">
                    <Skeleton className="h-3 w-28 rounded" />
                  </div>
                </div>
              ))}
            </div>

            {/* 3. Action Hub Cards — 3 columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="p-6 sm:p-7 rounded-3xl bg-card border border-border/80 shadow-xs flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <Skeleton className="w-12 h-12 rounded-2xl" />
                    <Skeleton className="h-5 w-40 rounded" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-3.5 w-full rounded" />
                      <Skeleton className="h-3.5 w-5/6 rounded" />
                      <Skeleton className="h-3.5 w-4/5 rounded" />
                    </div>
                  </div>
                  <Skeleton className="h-11 w-full rounded-xl" />
                </div>
              ))}
            </div>

            {/* 4. Verification / Trust Banner — 3 columns inside */}
            <div className="p-6 sm:p-8 rounded-3xl bg-muted/40 border border-border/80 space-y-5">
              <div className="flex items-center gap-2.5">
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="h-4 w-64 rounded" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-card border space-y-2"
                  >
                    <Skeleton className="h-4 w-36 rounded" />
                    <div className="space-y-1">
                      <Skeleton className="h-3 w-full rounded" />
                      <Skeleton className="h-3 w-5/6 rounded" />
                      <Skeleton className="h-3 w-4/5 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
