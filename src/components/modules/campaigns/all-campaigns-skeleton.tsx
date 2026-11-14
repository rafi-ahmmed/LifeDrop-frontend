export const AllCampaignsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 animate-pulse">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-4 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-muted" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted" />
              <div className="h-3 bg-muted rounded w-28" />
            </div>
            <div className="h-5 bg-muted rounded-full w-16" />
          </div>

          <div className="space-y-2.5">
            <div className="h-5 bg-muted rounded-md w-24" />
            <div className="h-4 bg-muted rounded-md w-full" />
            <div className="h-3 bg-muted rounded-md w-3/4" />
          </div>

          <div className="space-y-2 pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800">
            <div className="flex justify-between">
              <div className="h-3 bg-muted rounded w-20" />
              <div className="h-3 bg-muted rounded w-20" />
            </div>
            <div className="w-full h-2.5 bg-muted rounded-full" />
            <div className="flex justify-between items-center pt-0.5">
              <div className="h-3 bg-muted rounded w-16" />
              <div className="h-3 bg-muted rounded w-20" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <div className="h-9 bg-muted rounded-lg w-full" />
            <div className="h-9 bg-muted rounded-lg w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};
