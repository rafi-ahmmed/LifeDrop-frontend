export const MyCampaignSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="bg-card border rounded-2xl p-5 shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-muted" />

          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="h-5 bg-muted rounded-md w-3/4" />
              <div className="h-5 bg-muted rounded-full w-20 shrink-0" />
            </div>
            <div className="h-3.5 bg-muted rounded-md w-1/2" />
          </div>

          <div className="space-y-2 pt-2">
            <div className="flex justify-between">
              <div className="h-3 bg-muted rounded w-24" />
              <div className="h-3 bg-muted rounded w-24" />
            </div>
            <div className="w-full h-2 bg-muted rounded-full" />
            <div className="flex justify-end pt-1">
              <div className="h-2.5 bg-muted rounded w-12" />
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t">
            <div className="h-3.5 bg-muted rounded w-24" />
            <div className="flex items-center gap-2">
              <div className="h-8 bg-muted rounded-md w-16" />
              <div className="h-8 bg-muted rounded-md w-9" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
