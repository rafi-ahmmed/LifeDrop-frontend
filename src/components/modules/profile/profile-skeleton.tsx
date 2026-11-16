export const ProfileSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-pulse">
      <div className="lg:col-span-4 bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col items-center space-y-4">
        <div className="w-28 h-28 rounded-full bg-muted" />
        <div className="h-5 bg-muted rounded w-36" />
        <div className="h-3 bg-muted rounded w-44" />
        <div className="flex gap-2">
          <div className="h-5 bg-muted rounded-full w-16" />
          <div className="h-5 bg-muted rounded-full w-16" />
        </div>
        <div className="w-full border-t pt-4 space-y-3">
          <div className="h-3.5 bg-muted rounded w-full" />
          <div className="h-3.5 bg-muted rounded w-full" />
        </div>
      </div>

      <div className="lg:col-span-8 space-y-6">
        <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b pb-3.5">
            <div className="space-y-1.5">
              <div className="h-4 bg-muted rounded w-44" />
              <div className="h-3 bg-muted rounded w-64" />
            </div>
            <div className="h-8 bg-muted rounded-md w-16" />
          </div>
          <div className="space-y-4 pt-2">
            {[1, 2, 3, 4].map((row) => (
              <div key={row} className="flex items-center justify-between py-2">
                <div className="h-3.5 bg-muted rounded w-28" />
                <div className="h-3.5 bg-muted rounded w-40" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
