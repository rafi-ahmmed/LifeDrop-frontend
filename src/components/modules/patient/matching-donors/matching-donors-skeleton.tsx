import { Skeleton } from "@/components/ui/skeleton";

export function MatchingDonorsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: skeleton
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          key={i}
          className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-16 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      ))}
    </div>
  );
}
