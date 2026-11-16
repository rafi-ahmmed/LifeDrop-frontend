export const DonorRequestsSkeletonDonor = () => {
  return (
    <div className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-left border-collapse">
       
          <thead className="bg-muted/50 border-b border-zinc-200 dark:border-zinc-800">
            <tr>
              <th className="p-4 text-xs font-bold">
                <div className="h-3.5 bg-muted rounded w-24" />
              </th>
              <th className="p-4 text-xs font-bold">
                <div className="h-3.5 bg-muted rounded w-16" />
              </th>
              <th className="p-4 text-xs font-bold">
                <div className="h-3.5 bg-muted rounded w-20" />
              </th>
              <th className="p-4 text-xs font-bold">
                <div className="h-3.5 bg-muted rounded w-24" />
              </th>
              <th className="p-4 text-xs font-bold">
                <div className="h-3.5 bg-muted rounded w-14" />
              </th>
              <th className="p-4 text-xs font-bold text-right">
                <div className="h-3.5 bg-muted rounded w-20 ml-auto" />
              </th>
            </tr>
          </thead>

         
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {[1, 2, 3, 4, 5].map((row) => (
              <tr key={row} className="hover:bg-muted/20 transition-colors">
                {/* Patient Info */}
                <td className="p-4 space-y-1.5">
                  <div className="h-3.5 bg-muted rounded w-32" />
                  <div className="h-2.5 bg-muted rounded w-20" />
                </td>

                {/* Blood Group Badge */}
                <td className="p-4">
                  <div className="h-5 bg-muted rounded-md w-10" />
                </td>

                {/* Location */}
                <td className="p-4">
                  <div className="h-3.5 bg-muted rounded w-36" />
                </td>

                {/* Needed Date */}
                <td className="p-4">
                  <div className="h-3.5 bg-muted rounded w-24" />
                </td>

                {/* Status Badge */}
                <td className="p-4">
                  <div className="h-5 bg-muted rounded-full w-20" />
                </td>

                {/* Actions (Details, Interested, Decline Buttons) */}
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-8 bg-muted rounded-md w-16" />
                    <div className="h-8 bg-muted rounded-md w-24" />
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
