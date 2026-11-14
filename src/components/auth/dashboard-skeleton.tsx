import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="flex min-h-svh w-full bg-background relative overflow-hidden">
      {/* ব্যাকগ্রাউন্ডে হালকা প্রিমিয়াম গ্লোয়িং এফেক্ট */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* ১. সাইডবার স্কেলেটন (এখানে উইডথ w-[18.8rem] করা হয়েছে) */}
      <div className="hidden border-r bg-sidebar md:flex md:w-[18.8rem] flex-col shrink-0 justify-between">
        <div>
          {/* লোগো হেডার */}
          <div className="flex h-14 items-center px-4 border-b">
            <Skeleton className="h-6 w-28 rounded-md" />
          </div>

          {/* সাইডবার মেনু গ্রুপ এবং আইটেমগুলো */}
          <div className="flex-1 p-4 space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-20 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-9 w-full rounded-lg" />
                <Skeleton className="h-9 w-full rounded-lg" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-24 rounded" />
              <div className="space-y-2">
                <Skeleton className="h-9 w-full rounded-lg" />
                <Skeleton className="h-9 w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* সাইডবারের নিচে ফুটার ইনফো সেকশন */}
        <div className="p-3 border-t bg-muted/20">
          <div className="flex items-center gap-3 p-2.5 rounded-xl border border-border/50">
            <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
            <div className="space-y-1.5 flex-1 overflow-hidden">
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-2 w-28 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* ২. মূল কন্টেন্ট এরিয়া */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* স্টিকি হেডার স্কেলেটন */}
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between border-b bg-background px-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-4 w-32 rounded md:hidden" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </header>

        {/* মেইন কন্টেন্ট এরিয়া (ক্লিন গ্লোয়িং কার্ড বক্স) */}
        <main className="flex-1 p-4 md:p-8 space-y-6 max-w-4xl mx-auto w-full flex flex-col justify-center items-center text-center">
          <div className="w-full bg-card/40 backdrop-blur-md border rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center space-y-4 relative overflow-hidden ring-1 ring-primary/10">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary/40 via-rose-500/40 to-primary/20" />

            <div className="relative flex items-center justify-center">
              <div className="absolute w-16 h-16 rounded-full bg-primary/10 animate-ping" />
              <Skeleton className="w-12 h-12 rounded-xl" />
            </div>

            <div className="space-y-2 flex flex-col items-center">
              <Skeleton className="h-5 w-48 rounded" />
              <Skeleton className="h-3 w-64 rounded" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}