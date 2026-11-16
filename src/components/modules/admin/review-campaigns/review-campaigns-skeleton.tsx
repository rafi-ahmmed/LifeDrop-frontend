export const ReviewCampaignsSkeleton = () => {
  return (
    <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-muted/50 border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              <th className="p-4">
                <div className="h-3.5 bg-muted rounded w-32" />
              </th>
              <th className="p-4">
                <div className="h-3.5 bg-muted rounded w-24" />
              </th>
              <th className="p-4">
                <div className="h-3.5 bg-muted rounded w-24" />
              </th>
              <th className="p-4">
                <div className="h-3.5 bg-muted rounded w-20" />
              </th>
              <th className="p-4">
                <div className="h-3.5 bg-muted rounded w-16" />
              </th>
              <th className="p-4 text-right">
                <div className="h-3.5 bg-muted rounded w-28 ml-auto" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {[1, 2, 3, 4, 5].map((row) => (
              <tr key={row}>
                <td className="p-4 space-y-1.5">
                  <div className="h-3.5 bg-muted rounded w-40" />
                  <div className="h-2.5 bg-muted rounded w-28" />
                </td>
                <td className="p-4 space-y-1.5">
                  <div className="h-3.5 bg-muted rounded w-28" />
                  <div className="h-2.5 bg-muted rounded w-24" />
                </td>
                <td className="p-4 space-y-1.5">
                  <div className="h-3.5 bg-muted rounded w-24" />
                  <div className="h-2.5 bg-muted rounded w-20" />
                </td>
                <td className="p-4">
                  <div className="h-3.5 bg-muted rounded w-20" />
                </td>
                <td className="p-4">
                  <div className="h-5 bg-muted rounded-full w-16" />
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-8 bg-muted rounded-md w-16" />
                    <div className="h-8 bg-muted rounded-md w-20" />
                    <div className="h-8 bg-muted rounded-md w-20" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
