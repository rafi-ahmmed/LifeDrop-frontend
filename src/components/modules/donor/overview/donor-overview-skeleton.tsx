export const DonorOverviewSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse max-w-7xl mx-auto p-4 md:p-8">
      <div className="bg-card border rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-2 w-full md:w-auto">
          <div className="h-4 bg-muted rounded w-32" />
          <div className="h-7 bg-muted rounded w-64" />
        </div>
        <div className="h-10 bg-muted rounded-xl w-36" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-card border rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-muted" />
            <div className="space-y-1">
              <div className="h-3 bg-muted rounded w-20" />
              <div className="h-6 bg-muted rounded w-12" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border rounded-2xl p-6 h-40" />
        <div className="bg-card border rounded-2xl p-6 h-40" />
      </div>
    </div>
  );
};
