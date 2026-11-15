import { Skeleton } from "@/components/ui/skeleton";

export function DonorRequestsSkeleton() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
          key={index}
          className="bg-card border rounded-2xl shadow-sm overflow-hidden"
        >
          <div className="h-1 w-full bg-muted" />

          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 p-5 border-b bg-muted/20">
            <div className="flex items-center gap-3">
              <Skeleton className="w-12 h-12 rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-44 rounded-md" />
                <Skeleton className="h-3 w-56 rounded-md" />
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-3 w-28 rounded-md" />
            </div>
          </div>

          {/* Rows */}
          <div className="p-5 space-y-3">
            {Array.from({ length: 2 }).map((__, rowIndex) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
                key={rowIndex}
                className="flex flex-col gap-3 p-4 rounded-xl border bg-background/60"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <Skeleton className="w-10 h-10 rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-3.5 w-40 rounded-md" />
                      <Skeleton className="h-3 w-28 rounded-md" />
                    </div>
                  </div>
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <div className="flex items-center gap-2 pt-3 border-t">
                  <Skeleton className="h-8 w-20 rounded-4xl" />
                  <div className="flex items-center gap-2 sm:ml-auto">
                    <Skeleton className="h-8 w-20 rounded-4xl" />
                    <Skeleton className="h-8 w-24 rounded-4xl" />
                    <Skeleton className="h-8 w-20 rounded-4xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
