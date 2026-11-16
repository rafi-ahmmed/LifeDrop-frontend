export const AdminOverviewSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      {/* টপ ইউজার মেট্রিক কার্ড স্কেলেটন (৪টি কার্ড) */}
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-28" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-muted" />
              <div className="space-y-1.5">
                <div className="h-3 bg-muted rounded w-24" />
                <div className="h-7 bg-muted rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* মিডল সেকশন: Blood Requests & Fund Campaigns + Total Revenue স্কেলেটন */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((box) => (
          <div
            key={box}
            className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <div className="h-4 bg-muted rounded w-32" />
              <div className="h-5 bg-muted rounded-full w-20" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((sub) => (
                <div key={sub} className="bg-muted/50 p-3 rounded-xl space-y-2">
                  <div className="h-4 w-4 bg-muted rounded-full mx-auto" />
                  <div className="h-2.5 bg-muted rounded w-12 mx-auto" />
                  <div className="h-5 bg-muted rounded w-8 mx-auto" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* বটম চার্ট সেকশন স্কেলেটন (Bar Chart & Line Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((chart) => (
          <div
            key={chart}
            className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-4"
          >
            <div className="space-y-1.5">
              <div className="h-5 bg-muted rounded w-44" />
              <div className="h-3 bg-muted rounded w-64" />
            </div>
            <div className="h-[300px] bg-muted/50 rounded-xl w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};