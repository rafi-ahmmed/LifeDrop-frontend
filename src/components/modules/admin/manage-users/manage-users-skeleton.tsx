export const ManageUsersSkeleton = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((card) => (
          <div
            key={card}
            className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm flex items-center justify-between"
          >
            <div className="space-y-2">
              <div className="h-3 bg-muted rounded w-24" />
              <div className="h-7 bg-muted rounded w-14" />
            </div>
            <div className="w-11 h-11 rounded-xl bg-muted" />
          </div>
        ))}
      </div>

      <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-muted/50 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="p-4">
                  <div className="h-3.5 bg-muted rounded w-28" />
                </th>
                <th className="p-4">
                  <div className="h-3.5 bg-muted rounded w-16" />
                </th>
                <th className="p-4">
                  <div className="h-3.5 bg-muted rounded w-20" />
                </th>
                <th className="p-4">
                  <div className="h-3.5 bg-muted rounded w-16" />
                </th>
                <th className="p-4">
                  <div className="h-3.5 bg-muted rounded w-20" />
                </th>
                <th className="p-4 text-right">
                  <div className="h-3.5 bg-muted rounded w-24 ml-auto" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {[1, 2, 3, 4, 5, 6].map((row) => (
                <tr key={row}>
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-muted shrink-0" />
                    <div className="space-y-1.5">
                      <div className="h-3.5 bg-muted rounded w-28" />
                      <div className="h-2.5 bg-muted rounded w-36" />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="h-5 bg-muted rounded-md w-16" />
                  </td>
                  <td className="p-4">
                    <div className="h-5 bg-muted rounded-full w-20" />
                  </td>
                  <td className="p-4">
                    <div className="h-5 bg-muted rounded-full w-16" />
                  </td>
                  <td className="p-4">
                    <div className="h-3.5 bg-muted rounded w-24" />
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="h-8 bg-muted rounded-md w-16" />
                      <div className="h-8 bg-muted rounded-md w-20" />
                      <div className="h-8 bg-muted rounded-md w-16" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
