import { Skeleton } from "@/components/ui/skeleton";

export const AllCampaignsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="bg-card border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm relative p-5 space-y-4"
        >
          {/* ওপরের গ্রেডিয়েন্ট বারের যায়গায় স্কেলেটন */}
          <Skeleton className="absolute top-0 left-0 right-0 h-1.5 z-10 rounded-none" />

          {/* টপ সেকশন: আইকন ও ব্যাজ */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="h-3.5 w-28 rounded-md" />
            </div>
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          {/* মিডিয়াম সেকশন: পেশেন্ট ট্যাগ, টাইটেল এবং হসপিটাল */}
          <div className="space-y-2.5">
            <Skeleton className="h-5 w-32 rounded-md" />
            <Skeleton className="h-5 w-full rounded-md" />
            <Skeleton className="h-4 w-3/4 rounded-md" />
          </div>

          {/* প্রোগ্রেস ও অ্যামাউন্ট সেকশন */}
          <div className="space-y-2.5 pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800">
            <div className="flex justify-between">
              <Skeleton className="h-3.5 w-24 rounded-md" />
              <Skeleton className="h-3.5 w-24 rounded-md" />
            </div>
            
            {/* প্রোগ্রেস বার স্কেলেটন */}
            <Skeleton className="w-full h-2.5 rounded-full" />

            <div className="flex justify-between items-center pt-0.5">
              <Skeleton className="h-3 w-20 rounded-md" />
              <Skeleton className="h-3 w-24 rounded-md" />
            </div>
          </div>

          {/* নিচের দুটি বাটন (Details & Donate) */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Skeleton className="h-9 w-full rounded-xl" />
            <Skeleton className="h-9 w-full rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
};